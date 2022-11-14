class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const search = this.queryStr.search
      ? {
          name: {
            $regex: this.queryStr.search,
            $options: "i",
          },
        }
      : {};
    // console.log(search);

    //*this.query means Product.find() here
    this.query = this.query.find({ ...search });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["search", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy);
    //*filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    //*this.query means Product.find() here
    this.query = this.query.find(JSON.parse(queryStr));
    // this.query = this.query.find(queryCopy);
    // console.log(queryStr);
    return this;
  }

  pagination(resultPerPage) {
    let currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
