export const shipmentData = [
  {
    id: "SHP001",
    name: "Electronics Package",
    status: "In Transit",
    location: "Delhi"
  },
  {
    id: "SHP002",
    name: "Furniture Delivery",
    status: "Delivered",
    location:  "Delhi"
    
  },
  {
    id: "SHP003",
    name: "Clothing Shipment",
    status: "Pending",
    location: "Mumbai"  
  },
  {
    id: "SHP004",
    name: "Grocery Order",
    status: "Out for Delivery",
    location:"Bangalore"
    
  },
  {
    id: "SHP005",
    name: "Books Parcel",
    status: "Cancelled",
    location:  "Kolkata"
    
  }
];

export const kycData = [
  {
    user: "John Doe",
    status: "Pending",
    action: "Review"
  },
  {
    user: "Jane Smith",
    status: "Approved",
    action: "View"
  },
  {
    user: "Michael Johnson",
    status: "Rejected",
    action: "Re-submit"
  },
  {
    user: "Emily Davis",
    status: "Pending",
    action: "Review"
  },
  {
    user: "Chris Brown",
    status: "Approved",
    action: "View"
  },
  {
    user: "Olivia Wilson",
    status: "Pending",
    action: "Review"
  },
  {
    user: "Daniel Martinez",
    status: "Rejected",
    action: "Re-submit"
  },
  
];
export const userEmailData = [
  {
    "id": "USR001",
    "email": "john.doe@example.com",
    "status": "Pending",
    "action": "Review"
  },
  {
    "id": "USR002",
    "email": "jane.smith@example.com",
    "status": "Approved",
    "action": "View"
  },
  {
    "id": "USR003",
    "email": "alex.kumar@example.com",
    "status": "Rejected",
    "action": "Resubmit"
  },
  {
    "id": "USR004",
    "email": "priya.sharma@example.com",
    "status": "Pending",
    "action": "Review"
  },
  {
    "id": "USR005",
    "email": "rahul.verma@example.com",
    "status": "Approved",
    "action": "View"
  },
  {
    "id": "USR006",
    "email": "neha.gupta@example.com",
    "status": "Pending",
    "action": "Review"
  },
  {
    "id": "USR007",
    "email": "amit.patel@example.com",
    "status": "Rejected",
    "action": "Resubmit"
  },
  {
    "id": "USR008",
    "email": "sneha.reddy@example.com",
    "status": "Approved",
    "action": "View"
  }
];
export const shipmentDataDashboard = [
  {
    "id": "SHP001",
    "userId": "USR101",
    "description": "Electronics Package",
    "currentLocation": "Delhi Warehouse",
    "status": "In Transit",
    "lastUpdate": "2026-04-03T10:30:00Z",
    "action": "Track"
  },
  {
    "id": "SHP002",
    "userId": "USR102",
    "description": "Furniture Delivery",
    "currentLocation": "Gurgaon Hub",
    "status": "Out for Delivery",
    "lastUpdate": "2026-04-03T08:15:00Z",
    "action": "View Details"
  },
  {
    "id": "SHP003",
    "userId": "USR103",
    "description": "Clothing Shipment",
    "currentLocation": "Mumbai Facility",
    "status": "Pending",
    "lastUpdate": "2026-04-02T17:45:00Z",
    "action": "Review"
  },
  {
    "id": "SHP004",
    "userId": "USR104",
    "description": "Grocery Order",
    "currentLocation": "Noida Distribution Center",
    "status": "Delivered",
    "lastUpdate": "2026-04-02T12:20:00Z",
    "action": "Completed"
  },
  {
    "id": "SHP005",
    "userId": "USR105",
    "description": "Books Parcel",
    "currentLocation": "Jaipur Hub",
    "status": "Cancelled",
    "lastUpdate": "2026-04-01T14:10:00Z",
    "action": "Reorder"
  }
];
export const FleetTrackingData = [
  {
    vehicleId: "VH001",
    driverName: "Ravi Kumar",
    vehicleType: "Truck",
    currentLocation: {
      latitude: 28.4595,
      longitude: 77.0266,
      address: "Gurgaon, Haryana"
    },
    destination: {
      latitude: 28.7041,
      longitude: 77.1025,
      address: "Delhi"
    },
    status: "pending",
    lastUpdated: "2026-04-06T10:30:00Z"
  },
  {
    vehicleId: "VH002",
    driverName: "Amit Singh",
    vehicleType: "Mini Truck",
    currentLocation: {
      latitude: 19.0760,
      longitude: 72.8777,
      address: "Mumbai"
    },
    destination: {
      latitude: 18.5204,
      longitude: 73.8567,
      address: "Pune"
    },
    status: "pending",
    lastUpdated: "2026-04-06T09:15:00Z"
  },
  {
    vehicleId: "VH003",
    driverName: "Suresh Patel",
    vehicleType: "Van",
    currentLocation: {
      latitude: 23.0225,
      longitude: 72.5714,
      address: "Ahmedabad"
    },
    destination: {
      latitude: 22.3072,
      longitude: 73.1812,
      address: "Vadodara"
    },
    status: "pending",
    lastUpdated: "2026-04-05T18:45:00Z"
  },
  {
    vehicleId: "VH004",
    driverName: "Neha Sharma",
    vehicleType: "Bike",
    currentLocation: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "Bangalore"
    },
    destination: {
      latitude: 13.0827,
      longitude: 80.2707,
      address: "Chennai"
    },
    status: "pending",
    lastUpdated: "2026-04-06T11:00:00Z"
  },
  {
    vehicleId: "VH005",
    driverName: "Imran Khan",
    vehicleType: "Truck",
    currentLocation: {
      latitude: 26.9124,
      longitude: 75.7873,
      address: "Jaipur"
    },
    destination: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: "New Delhi"
    },
    status: "pending",
    lastUpdated: "2026-04-06T08:50:00Z"
  }
];