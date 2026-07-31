const mongoose = require('mongoose');
const Category = require('../models/category.model.js');
const Product = require('../models/product.model.js');
const Supplier = require('../models/supplier.model.js');
const { stockModel } = require('../models/stock.model.js');

const categoriesData = [
  { name: 'Electronics', description: 'Phones, laptops, and accessories' },
  { name: 'Office Supplies', description: 'Pens, paper, and desk items' },
  { name: 'Furniture', description: 'Desks, chairs, and storage' },
  { name: 'Kitchen & Dining', description: 'Appliances, cookware, and utensils' },
  { name: 'Sports & Outdoors', description: 'Fitness gear and outdoor equipment' },
  { name: 'Stationery', description: 'Writing and organizational supplies' },
];

const suppliersData = [
  {
    name: 'Nile Valley Food Industries',
    email: 'info@nilevalleyfoods.com',
    phone: '+20-2-23456789',
    address: '123 Corniche El Nile, Maadi, Cairo, Egypt',
    contactPerson: {
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@nilevalleyfoods.com',
      phone: '+20-12-3456-7890',
    },
    isActive: true,
    industry: 'Food Processing & Agriculture',
  },
  {
    name: 'Cairo Tech Distributors',
    email: 'sales@cairotech.com',
    phone: '+20-2-27891234',
    address: '45 Tahrir Street, Downtown, Cairo, Egypt',
    contactPerson: {
      name: 'Mona Farid',
      email: 'mona.farid@cairotech.com',
      phone: '+20-10-9876-5432',
    },
    isActive: true,
    industry: 'Electronics & Technology',
  },
  {
    name: 'Delta Office Supplies Co.',
    email: 'contact@deltaoffice.com',
    phone: '+20-2-25551234',
    address: '78 El Nasr Road, Nasr City, Cairo, Egypt',
    contactPerson: {
      name: 'Karim Aboul-Ela',
      email: 'karim@deltaoffice.com',
      phone: '+20-11-2233-4455',
    },
    isActive: true,
    industry: 'Office Supplies & Stationery',
  },
  {
    name: 'Alexandria Furniture Works',
    email: 'info@alexfurniture.com',
    phone: '+20-3-4871234',
    address: '12 Corniche Road, Alexandria, Egypt',
    contactPerson: {
      name: 'Sherif Naguib',
      email: 'sherif@alexfurniture.com',
      phone: '+20-12-7654-3210',
    },
    isActive: true,
    industry: 'Furniture & Home Goods',
  },
  {
    name: 'Red Sea Sports Equipment',
    email: 'sales@redseasports.com',
    phone: '+20-65-3456789',
    address: '30 El Gouna Road, Hurghada, Egypt',
    contactPerson: {
      name: 'Nour El-Din',
      email: 'nour@redseasports.com',
      phone: '+20-10-1122-3344',
    },
    isActive: true,
    industry: 'Sports & Outdoor Equipment',
  },
];

const supplierByCategory = {
  Electronics: 'Cairo Tech Distributors',
  'Office Supplies': 'Delta Office Supplies Co.',
  Furniture: 'Alexandria Furniture Works',
  'Kitchen & Dining': 'Nile Valley Food Industries',
  'Sports & Outdoors': 'Red Sea Sports Equipment',
  Stationery: 'Delta Office Supplies Co.',
};

const productsByCategory = {
  Electronics: [
    { name: 'Wireless Mouse', sku: 'ELEC-001', price: 15.99, quantity: 50, lowStockThreshold: 10 },
    { name: 'USB-C Charger 65W', sku: 'ELEC-002', price: 22.5, quantity: 5, lowStockThreshold: 10 },
    { name: 'Mechanical Keyboard', sku: 'ELEC-003', price: 59.99, quantity: 30, lowStockThreshold: 8 },
    { name: 'Noise-Cancelling Headphones', sku: 'ELEC-004', price: 89.99, quantity: 3, lowStockThreshold: 5 },
    { name: '27" Monitor', sku: 'ELEC-005', price: 189.0, quantity: 18, lowStockThreshold: 5 },
    { name: 'Portable SSD 1TB', sku: 'ELEC-006', price: 74.5, quantity: 40, lowStockThreshold: 10 },
  ],
  'Office Supplies': [
    { name: 'A4 Notebook', sku: 'OFF-001', price: 3.25, quantity: 200, lowStockThreshold: 30 },
    { name: 'Stapler', sku: 'OFF-002', price: 6.75, quantity: 60, lowStockThreshold: 15 },
    { name: 'Sticky Notes Pack', sku: 'OFF-003', price: 2.1, quantity: 8, lowStockThreshold: 20 },
    { name: 'Printer Paper Ream', sku: 'OFF-004', price: 5.99, quantity: 90, lowStockThreshold: 20 },
  ],
  Furniture: [
    { name: 'Office Chair', sku: 'FUR-001', price: 149.99, quantity: 12, lowStockThreshold: 5 },
    { name: 'Standing Desk', sku: 'FUR-002', price: 299.0, quantity: 6, lowStockThreshold: 3 },
    { name: 'Bookshelf', sku: 'FUR-003', price: 89.5, quantity: 2, lowStockThreshold: 4 },
  ],
  'Kitchen & Dining': [
    { name: 'Electric Kettle', sku: 'KIT-001', price: 24.99, quantity: 25, lowStockThreshold: 8 },
    { name: 'Coffee Maker', sku: 'KIT-002', price: 45.0, quantity: 15, lowStockThreshold: 5 },
    { name: 'Non-Stick Pan Set', sku: 'KIT-003', price: 39.99, quantity: 4, lowStockThreshold: 6 },
  ],
  'Sports & Outdoors': [
    { name: 'Yoga Mat', sku: 'SPT-001', price: 18.0, quantity: 35, lowStockThreshold: 10 },
    { name: 'Adjustable Dumbbells', sku: 'SPT-002', price: 129.99, quantity: 9, lowStockThreshold: 4 },
    { name: 'Camping Tent 2-Person', sku: 'SPT-003', price: 79.0, quantity: 7, lowStockThreshold: 5 },
  ],
  Stationery: [
    { name: 'Ballpoint Pen Box', sku: 'STA-001', price: 4.5, quantity: 150, lowStockThreshold: 25 },
    { name: 'Highlighter Set', sku: 'STA-002', price: 6.25, quantity: 12, lowStockThreshold: 15 },
    { name: 'Whiteboard Markers', sku: 'STA-003', price: 7.0, quantity: 20, lowStockThreshold: 10 },
  ],
};

// People who "perform" stock actions in the seed data (plain strings, no User model yet)
const performers = ['Ahmed Ali', 'Mona Farid', 'Karim Aboul-Ela', 'Sherif Naguib'];

const seedProductsAndCategories = async () => {
  console.log('Clearing existing stock movements, suppliers, categories and products...');
  await stockModel.deleteMany({});
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Supplier.deleteMany({});

  console.log('Inserting suppliers...');
  const suppliers = await Supplier.insertMany(suppliersData);
  const supplierMap = {};
  suppliers.forEach((s) => {
    supplierMap[s.name] = s._id;
  });

  console.log('Inserting categories...');
  const categories = await Category.insertMany(categoriesData);

  console.log('Inserting products...');
  const productsData = [];
  for (const category of categories) {
    const items = productsByCategory[category.name] || [];
    const supplierName = supplierByCategory[category.name];
    const supplierId = supplierMap[supplierName];

    for (const item of items) {
      productsData.push({
        ...item,
        description: `${item.name} - ${category.name}`,
        category: category._id,
        supplier: supplierId,
      });
    }
  }
  const products = await Product.insertMany(productsData);

  console.log('Inserting stock movements...');
  const stockData = products.map((product, index) => ({
    product: product._id,
    action: 'Add',
    quantity: product.quantity,
    performedBy: performers[index % performers.length],
  }));
  const stockMovements = await stockModel.insertMany(stockData);

  console.log('Seed complete:');
  console.log(`  Suppliers: ${suppliers.length}`);
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Products: ${products.length}`);
  console.log(`  Stock movements: ${stockMovements.length}`);

  return { suppliers, categories, products, stockMovements };
};

if (require.main === module) {
  require('dotenv').config();
  const connectDB = require('../config/db');

  connectDB()
    .then(() => seedProductsAndCategories())
    .then(() => mongoose.disconnect())
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed failed:', err);
      process.exit(1);
    });
}

module.exports = seedProductsAndCategories;