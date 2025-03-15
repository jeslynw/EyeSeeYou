import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logo from "../images/logo2.png";

const PDF = (
  criticalCount,
  highCount,
  mediumCount,
  lowCount,
  trendAttacks,
  networkStatus,
  srcAndDstIP,
  answerRecommendation,
  answerConclusion,
  answerTrend,
  openCount,
  inProgressCount,
  resolvedCount,
  falsePositiveCount,
  severityLevel,
  predictedAttack,
  formattedConfidence
) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });

  const startX = 20; // Starting X position
  const endX = 190; // Ending X position (width of the page - margin)
  const pageHeight = doc.internal.pageSize.height; // Height of the page
  const maxHeight = pageHeight - 30; // Change this value based on your needs
  let currentHeight = 20; // Initialize current height

  const addFooter = () => {
    doc.setFontSize(8).text("© 2024 EyeSeeYou. All rights reserved.", 20, pageHeight - 10);
  };

  // Function to check if we need to add a new page
  const checkAndAddPage = (additionalHeight) => {
    if (currentHeight + additionalHeight > maxHeight) {
      addFooter();
      doc.addPage();
      currentHeight = 20; // Reset current height
    }
  };

  const justifyText = (doc, text, startX, y, maxWidth) => {
    const words = text.split(" ");
    let line = "";
    let lineHeight = doc.internal.getFontSize() * 0.5; // Line height
    let currentY = y; // Starting Y position for the text

    for (let word of words) {
      const testLine = line + word + " ";
      const testWidth =
        (doc.getStringUnitWidth(testLine) * doc.internal.getFontSize()) / doc.internal.scaleFactor;

      if (testWidth > maxWidth && line) {
        // Split the line into words and add it to the PDF
        const lineWords = line.trim().split(" "); // Remove extra space and split
        const totalSpaces = lineWords.length - 1; // Number of spaces in the line

        // Calculate total width of all words
        const lineWidth = lineWords.reduce(
          (acc, word) =>
            acc +
            (doc.getStringUnitWidth(word) * doc.internal.getFontSize()) / doc.internal.scaleFactor,
          0
        );
        const spaceWidth = (maxWidth - lineWidth) / totalSpaces; // Space width for justification

        // Create adjusted line
        let justifiedLine = "";
        for (let i = 0; i < lineWords.length; i++) {
          justifiedLine += lineWords[i];
          if (i < lineWords.length - 1) {
            justifiedLine += " ".repeat(Math.floor(spaceWidth)); // Add adjusted spaces
          }
        }

        doc.text(justifiedLine, startX, currentY);
        currentY += lineHeight; // Move down for the next line
        line = word + " "; // Start new line
      } else {
        line = testLine; // Keep adding to the line
      }
    }

    // Add any remaining text
    if (line) {
      doc.text(line, startX, currentY);
    }

    return currentY - y + lineHeight; // Return the total height of the text block
  };

  // logo
  doc.addImage(logo, "PNG", 18, 10, 13, 10);
  doc.setFont("SansitaSwashed").setFontSize(18).text("EyeSeeYou", 36, 17);

  currentHeight += 15; // Add space after logo

  // Title
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(20).text("EyeSeeYou Network Analysis Report", 48, currentHeight);
  doc.setFont("Times-Roman", "normal");
  currentHeight += 15;

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  doc.setFont("light").setFontSize(10).text(`Date: ${currentDate}`, startX, currentHeight);
  currentHeight += 5;
  doc
    .setFont("light")
    .setFontSize(10)
    .text(`Reporting Period: ${currentTime}`, startX, currentHeight);
  currentHeight += 10;

  // Executive Summary
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("Executive Summary", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11);
  const summaryHeight = justifyText(
    doc,
    `This report provides a comprehensive overview of network activity monitored by the EyeSeeYou intrusion detection system. It highlights recent security alerts, trends in network activity, and recommendations for enhancing overall security posture. Over the reporting period, the system detected a total of ${
      criticalCount + highCount + mediumCount + lowCount
    } alerts, with network status '${networkStatus}'.`,
    startX,
    currentHeight,
    endX - startX
  );
  currentHeight += summaryHeight + 10;

  // Overview of Network Activity
  checkAndAddPage(40);
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("1. Overview of Network Activity", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc
    .setFontSize(11)
    .text(
      "During the reporting period, the EyeSeeYou dashboard tracked a variety of network activities, including:",
      startX,
      currentHeight
    );
  currentHeight += 5;
  doc.text(`• Network Status: ${networkStatus}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• Source And Target IP Analysis:`, 25, currentHeight);
  currentHeight += 3;

  const tableBody = srcAndDstIP.map((srcIP) => {
    return [srcIP.src_addr, srcIP.count_src_addr, srcIP.dst_addr, srcIP.count_dst_addr];
  });

  doc.autoTable({
    head: [["Top Threat Sources", "Count", "Top Targeted Hosts", "Count"]],
    body: tableBody,
    startY: currentHeight,
    theme: "grid",
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontSize: 8,
    },
    bodyStyles: {
      fillColor: [240, 240, 240],
    },
    alternateRowStyles: {
      fillColor: [220, 220, 220],
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor: [0, 0, 0],
    },
    tableWidth: 100,
    margin: { left: 25 },
  });

  currentHeight = doc.lastAutoTable.finalY + 10;

  // Incident Summary
  checkAndAddPage(40);
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("2. Incident Summary", startX, currentHeight);
  currentHeight += 5;

  // Alert Breakdown
  doc.setFontSize(13).text("2.1 Alert Breakdown", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc
    .setFontSize(11)
    .text(
      `The EyeSeeYou system detected a total of ${
        criticalCount + highCount + mediumCount + lowCount
      } alerts categorized by severity as follows:`,
      startX,
      currentHeight
    );
  currentHeight += 5;
  doc.text(`• Critical Alerts: ${criticalCount}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• High Alerts: ${highCount}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• Medium Alerts: ${mediumCount}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• Low Alerts: ${lowCount}`, 25, currentHeight);
  currentHeight += 10;

  // Alert Status
  checkAndAddPage(40);
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(13).text("2.2 Alert Status", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc
    .setFontSize(11)
    .text("The following are the current statuses of the alerts:", startX, currentHeight);
  currentHeight += 5;
  doc.text(`• Open: ${openCount}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• In Progress: ${inProgressCount}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• Resolved: ${resolvedCount}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• False Positive: ${falsePositiveCount}`, 25, currentHeight);
  currentHeight += 10;

  // ML analysis
  // checkAndAddPage(40);
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(13).text("2.3 Analysis of Historical Patterns", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11);
  const mlAnalysisHeight = justifyText(
    doc,
    `Following up on the recent analysis, the system has detected an ${predictedAttack} pattern with a ${severityLevel} severity level. The confidence level of the detection stands at ${formattedConfidence}%, indicating a significant risk.`,
    startX,
    currentHeight,
    endX - startX
  );
  currentHeight += 10;
  doc.text(`• Pattern Detected: ${predictedAttack}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• Confidence Level: ${formattedConfidence}`, 25, currentHeight);
  currentHeight += 5;
  doc.text(`• Severity Level: ${severityLevel}`, 25, currentHeight);
  currentHeight += 10;

  // Recent Threat Trends
  checkAndAddPage(40);
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(13).text("2.4 Recent Threat Trends", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc
    .setFontSize(11)
    .text("The following trends were observed in detected threats:", startX, currentHeight);
  currentHeight += 5;
  doc.text("• Most Frequent Alert Types:", 25, currentHeight);
  currentHeight += 3;

  doc.autoTable({
    head: [["Alert Type", "Count"]],
    body: trendAttacks.map((attack) => [attack.class, attack.count]),
    startY: currentHeight,
    theme: "grid",
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontSize: 8,
    },
    bodyStyles: {
      fillColor: [240, 240, 240],
    },
    alternateRowStyles: {
      fillColor: [220, 220, 220],
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor: [0, 0, 0],
    },
    tableWidth: 80,
    margin: { left: 25 },
  });

  currentHeight = doc.lastAutoTable.finalY + 10;

  // Emerging Threat Patterns
  checkAndAddPage(40);
  doc.text("• Emerging Threat Patterns:", 25, currentHeight);
  currentHeight += 5;
  const trendTextHeight = justifyText(doc, answerTrend, 25, currentHeight, endX - startX - 5);
  currentHeight += trendTextHeight + 10;

  // Recommended Action section
  checkAndAddPage(40);
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("3. Recommended Action", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11);
  const recommendationTextHeight = justifyText(
    doc,
    answerRecommendation,
    25,
    currentHeight,
    endX - startX - 5
  );
  currentHeight += recommendationTextHeight + 10;

  // Conclusion section
  checkAndAddPage(40);
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("4. Conclusion", startX, currentHeight);
  currentHeight += 5;
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11);
  const conclusionTextHeight = justifyText(
    doc,
    answerConclusion,
    25,
    currentHeight,
    endX - startX - 5
  );

  // Add copyright statement
  addFooter();

  // Save the PDF
  doc.save("report.pdf");
};

export default PDF;
