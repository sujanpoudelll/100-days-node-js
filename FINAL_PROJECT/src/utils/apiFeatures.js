class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    //Filtering
    filter() {
        const queryObj = {...this.queryString};
        const excludedFields = ['sort','page','limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        //conver to mongoDB format
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;

    }

    //Sorting
    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    //Pagination
    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 5;
        const skip = (page -1)*limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;


