const paginate = async (model, conditions, page = 1, limit = 10, sort = { _id: -1 }) => {
    try {
      const skip = (page - 1) * limit;
      const totalRecords = await model.countDocuments(conditions);
      const totalPages = Math.ceil(totalRecords / limit);
      const data = await model.find(conditions).sort(sort).skip(skip).limit(limit);
  
      return {
        totalPages,
        currentPage: page,
        totalRecords,
        data,
      };
    } catch (error) {
      throw new Error("Error paginating data");
    }
  };
  
  module.exports = paginate