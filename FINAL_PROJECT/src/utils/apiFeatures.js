class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
        this.mongoQuery = {};
    }

    //Filtering
    filter() {
        
        const queryObj = {...this.queryString};
        const excludedFields = ['sort','page','limit','keyword'];
        excludedFields.forEach(el => delete queryObj[el]);

        //conver to mongoDB format
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g, 
            match => `$${match}`
        );

        this.mongoQuery = {
            ...this.mongoQuery,
            ...JSON.parse(queryStr)
        };

        console.log("REQ QUERY:", this.queryString);
        console.log("PARSED QUERY:", JSON.parse(queryStr));

        return this;
    }

    //Search
    search() {
        if(this.queryString.keyword){
            this.mongoQuery.name ={
                $regex: this.queryString.keyword,
                $options: "i"
            };
        }
        return this;
    }

    //Apply query once
    build(){
        this.query = this.query.find(this.mongoQuery);
        return this;
    }

    //Sorting
    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('_id');
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


