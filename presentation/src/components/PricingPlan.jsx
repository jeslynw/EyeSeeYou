import React from "react";

function PricingPlan() {
  const pricingPlan = [
    {
      namePlan: "Basic Plan",
      price: 0,
      month: "",
      include: [
        "1 account",
        "Network Overview",
        "Threat Detection",
        "Real Time Monitoring",
        "Alert Notifications",
      ],
      limited: ["Alerts Overview", "Threat Analysis", "Attack Trends"],
      notIncluded: ["Alerts Management", "Management Insights"],
    },
    {
      namePlan: "1-Month Plan",
      price: 80,
      month: "/month",
      include: [
        "Up to 10 accounts",
        "Network Overview",
        "Threat Detection",
        "Real Time Monitoring",
        "Alert Notifications",
        "Alerts Overview",
        "Threat Analysis",
        "Attack Trends",
        "Alerts Management",
        "Management Insights",
      ],
    },
    // {
    //     'namePlan': '6-Months Plan',
    //     'price': 460,
    //     'month': '/6 month',
    //     'include': ['Network Overview', 'Threat Detection', 'Real Time Monitoring', 'Alert Notifications', 'Alerts Overview', 'Threat Analysis', 'Attack Trends', 'Alerts Management', 'Management Insights']
    // },
    // {
    //     'namePlan': '12-Months Plan',
    //     'price': 900,
    //     'month': '/12 month',
    //     'include': ['Network Overview', 'Threat Detection', 'Real Time Monitoring', 'Alert Notifications', 'Alerts Overview', 'Threat Analysis', 'Attack Trends', 'Alerts Management', 'Management Insights']
    // }
  ];

  const Tooltip = ({ title, children }) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative inline-block">
        {children}
        {visible && (
          <div className="absolute z-10 bg-gray-700 text-white text-sm rounded py-1 px-2 bottom-full mb-1 transform translate-x-[-50%] left-1/2">
            {title}
          </div>
        )}
      </span>
    );
  };

  // Function to render items with icons
  const renderItems = (items = [], type) => {
    return items.map((item, index) => {
      let icon, title;

      if (type === "include") {
        icon = (
          <svg className="w-4 h-4 mr-2 text-[#00bfff]" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
        title = "Included Feature";
      } else if (type === "limited") {
        icon = (
          <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a7 7 0 100 14 7 7 0 000-14zm-1 10a1 1 0 112-0 1 1 0 01-2 0zm1-6a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
        title = "Limited Feature";
      } else if (type === "notIncluded") {
        icon = (
          <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a7 7 0 100 14 7 7 0 000-14zm-1 10a1 1 0 112-0 1 1 0 01-2 0zm1-6a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
        title = "Not Included";
      }

      return (
        <li key={index} className="flex items-center mb-2 ">
          <Tooltip title={title}>{icon}</Tooltip>
          {item}
        </li>
      );
    });
  };

  return (
    <div className="flex items-center space-x-10 mx-12 gap-10 px-8 lg:px-5 justify-center">
      {pricingPlan.map((plan, index) => (
        <div
          key={index}
          className="relative w-[300px] bg-transparent border-[1px] border-[#ffffff3f] text-white p-6 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#00bfff]">
          {/* Larger light corner effects */}
          <div
            className="absolute top-0 left-0 w-28 h-32"
            style={{
              background:
                "radial-gradient(circle at 0 0, rgba(0, 192, 255, 0.72) 0%, rgba(0, 191, 255, 0.24) 40%, transparent 70%)",
            }}></div>
          <div
            className="absolute bottom-0 right-0 w-28 h-32"
            style={{
              background:
                "radial-gradient(circle at 100% 100%, rgba(0, 191, 255, 0.72) 0%, rgba(0, 191, 255, 0.24) 40%, transparent 70%)",
            }}></div>

          {/* Content */}
          <h2 className="text-xl font-medium mb-9"> {plan.namePlan} </h2>

          <p className="text-3xl font-semibold mb-9">
            $ {plan.price}
            <span className="text-sm font-normal">{plan.month}</span>
          </p>
          <p className="text-sm mb-4">Includes:</p>
          <ul className="space-y-2 text-sm">{renderItems(plan.include, "include")}</ul>
          <ul className="space-y-2 mt-2 text-sm">{renderItems(plan.limited, "limited")}</ul>
          <ul className="space-y-2 mt-2 text-sm line-through">
            {renderItems(plan.notIncluded, "notIncluded")}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PricingPlan;
