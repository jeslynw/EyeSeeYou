import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import sansitaSwashed from '../fonts/SansitaSwashed-Regular.ttf';

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
  falsePositiveCount
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
      // addFooter();
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
  };

  // logo
  doc.addImage(logo, "PNG", 18, 10, 13, 10);
  doc.setFont("SansitaSwashed").setFontSize(18).text("EyeSeeYou", 36, 17);

  doc.setFontSize(12).text(" ", 10, 30); // line break

  // Title
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(20).text("EyeSeeYou Network Analysis Report", 48, 32);
  doc.setFont("Times-Roman", "normal");

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  doc.setFont("light").setFontSize(10).text(`Date: ${currentDate}`, startX, 45);
  doc.setFont("light").setFontSize(10).text(`Reporting Period: ${currentTime}`, startX, 50);

  // Executive Summary
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("Executive Summary", startX, 55 + 5);
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11);
  justifyText(
    doc,
    `This report provides a comprehensive overview of network activity monitored by the EyeSeeYou intrusion detection system. It highlights recent security alerts, trends in network activity, and recommendations for enhancing overall security posture. Over the reporting period, the system detected a total of ${
      criticalCount + highCount + mediumCount + lowCount
    } alerts, with network status '${networkStatus}'.`,
    startX,
    60 + 5,
    endX - startX
  );

  // Overview of Network Activity
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("1. Overview of Network Activity", startX, 85 + 5);
  doc.setFont("Times-Roman", "normal");
  doc
    .setFontSize(11)
    .text(
      "During the reporting period, the EyeSeeYou dashboard tracked a variety of network activities, including:",
      startX,
      90 + 5
    );
  doc.text(`• Network Status: ${networkStatus}`, 25, 95 + 5);

  doc.text(`• Source And Target IP Analysis`, 25, 100 + 5);
  doc.text(`:`, 76, 100 + 5);
  doc.text(``, 63, 100 + 5);

  const tableBody = srcAndDstIP.map((srcIP, index) => {
    return [
      srcIP.src_addr, // Source Address
      srcIP.count_src_addr, // Count of Source Address
      srcIP.dst_addr, // Destination Address
      srcIP.count_dst_addr, // Count of Destination Address
    ];
  });

  doc.autoTable({
    head: [["Top Threat Sources", "Count", "Top Targeted Hosts", "Count"]],
    body: tableBody,
    startY: 108,
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

  // Incident Summary
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("2. Incident Summary", startX, 150);

  // Alert Breakdown
  doc.setFontSize(13).text("2.1 Alert Breakdown", startX, 155);
  doc.setFont("Times-Roman", "normal");
  doc
    .setFontSize(11)
    .text(
      `The EyeSeeYou system detected a total of ${
        criticalCount + highCount + mediumCount + lowCount
      } alerts categorized by severity as follows:`,
      startX,
      160
    );
  doc.text(`• Critical Alerts: ${criticalCount}`, 25, 165);
  doc.text(`• High Alerts: ${highCount}`, 25, 170);
  doc.text(`• Medium Alerts: ${mediumCount}`, 25, 175);
  doc.text(`• Low Alerts: ${lowCount}`, 25, 180);

  // Alert Status
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(13).text("2.2 Alert Status", startX, 190);
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11).text("The following are the current statuses of the alerts:", startX, 195);
  doc.text(`• Open: ${openCount}`, 25, 200);
  doc.text(`• In Progress: ${inProgressCount}`, 25, 205);
  doc.text(`• Resolved: ${resolvedCount}`, 25, 210);
  doc.text(`• False Positive: ${falsePositiveCount}`, 25, 215);

  // Recent Threat Trends
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(13).text("2.3 Recent Threat Trends", startX, 225);
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11).text("The following trends were observed in detected threats:", startX, 230);
  doc.setFontSize(11).text("• Most Frequent Alert Types:", 25, 235);

  doc.autoTable({
    head: [["Alert Type", "Count"]],
    body: trendAttacks.map((attack) => [attack.class, attack.count]),
    startY: 238,
    theme: "grid", // another options: striped, plain
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: "normal",
      fontSize: 8,
    },
    bodyStyles: {
      fillColor: [240, 240, 240], // Body rows background color
    },
    alternateRowStyles: {
      fillColor: [220, 220, 220], // Alternate row background color
    },
    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor: [0, 0, 0],
    },
    tableWidth: 80,
    margin: { left: 25 },
  });

  const finalY = doc.lastAutoTable.finalY;

  // Emerging Threat Patterns
  const lineHeight = doc.internal.getFontSize() * 0.5;

  // Emerging Threat Patterns
  checkAndAddPage(finalY + 10); // Check if we need a new page
  doc.setFontSize(11).text("• Emerging Threat Patterns:", 25, currentHeight);
  const trendTextHeight = doc.splitTextToSize(answerTrend, endX - startX - 5).length * lineHeight; // Calculate height needed for recommendation text
  doc.setFontSize(11);
  justifyText(doc, answerTrend, 25, (currentHeight += 5), endX - startX - 5);
  currentHeight += trendTextHeight;

  // Recommended Action section
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("3. Recommended Action", startX, currentHeight);
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11);
  const recommendationTextHeight =
    doc.splitTextToSize(answerRecommendation, endX - startX - 5).length * lineHeight; // Calculate height needed for recommendation text
  justifyText(doc, answerRecommendation, 25, (currentHeight += 5), endX - startX - 5);
  currentHeight += recommendationTextHeight;

  // Conclusion section
  doc.setFont("Times-Roman", "bold");
  doc.setFontSize(15).text("4. Conclusion", startX, currentHeight);
  doc.setFont("Times-Roman", "normal");
  doc.setFontSize(11);
  justifyText(doc, answerConclusion, 25, (currentHeight += 5), endX - startX - 5);

  // Add copyright statement
  addFooter();

  // Save the PDF
  doc.save("report.pdf");
};

export default PDF;
