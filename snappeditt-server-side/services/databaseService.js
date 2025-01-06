// services/databaseService.js

const mongoose = require("mongoose");

class DatabaseService {
  constructor(model) {
    if (!model) throw new Error("Model is required for DatabaseService");
    this.model = model;
  }

  /**
   * Add a new document to the database.
   * @param {Object} data - The data to be added based on the schema.
   * @returns {Promise<Object>} - The saved document.
   */
  async add(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw new Error(`Error adding document: ${error.message}`);
    }
  }

  /**
   * Find documents in the database.
   * @param {Object} query - The query object to filter results.
   * @returns {Promise<Array>} - The found documents.
   */
  async find(query = {}) {
    try {
      return await this.model.find(query);
    } catch (error) {
      throw new Error(`Error finding documents: ${error.message}`);
    }
  }

  /**
   * Update a document in the database.
   * @param {Object} query - The query object to identify the document.
   * @param {Object} update - The data to update.
   * @returns {Promise<Object>} - The updated document.
   */
  async update(query, update) {
    try {
      return await this.model.findOneAndUpdate(query, update, { new: true });
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  /**
   * Delete a document from the database.
   * @param {Object} query - The query object to identify the document.
   * @returns {Promise<Object>} - The deleted document.
   */
  async delete(query) {
    try {
      return await this.model.findOneAndDelete(query);
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }
}

module.exports = DatabaseService;
