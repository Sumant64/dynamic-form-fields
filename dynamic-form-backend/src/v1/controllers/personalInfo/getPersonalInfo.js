const PersonalInfo = require("../../models/personalInfoModal");

// @desc - get personal info
// @route - GET - /api/personal-info
// api/personal-info?row-per-page=10&page=2&sort=<id>-<asc/dec>&search=<search>
// @access - public
const getPersonalInfo = async (req, res) => {
  try {
    let rowPerPage = parseInt(req.query["row-per-page"]);
    let page = parseInt(req.query["page"]);
    const skip = page * rowPerPage - rowPerPage;
    const limit = rowPerPage;
    let search = req.query["search"];
    let sort = req.query["sort"];
    let searchQuery = [];
    let sortquery = [];

    if (search.length > 0) {
      searchQuery = [
        {
          $addFields: {
            personalInfoArray: { $objectToArray: "$personalInfo" }, // Convert the object into an array of key-value pairs
          },
        },
        {
          $match: {
            "personalInfoArray.v": { $regex: search, $options: "i" }, // Match any value (v) in the array
          },
        },
        {
          $project: {
            _id: 1,
            personalInfo: 1,
          },
        },
      ];
    }

    if (sort.length > 0) {
      let sortArr = sort.split("-")
      let sortVarible = `personalInfo.${sortArr[0]}`;
      let ascDesc = sortArr[1] === 'asc' ? 1 : -1;

      sortquery = [
        {
          // Sort by the dynamic field
          $sort: {
            [sortVarible]: ascDesc, // 1 for ascending, -1 for descending
          },
        },
      ];
    }

    const result = await PersonalInfo.aggregate([
      {
        $facet: {
          data: [
            ...searchQuery,
            ...sortquery,
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
          totalcount: [
            ...searchQuery,
            {
              $count: "totalcount",
            },
          ],
        },
      },
    ]);

    let totalCounts = await PersonalInfo.find({}).countDocuments();

    if (search.length > 0) {
      totalCounts = result[0].totalcount[0].totalcount;
    }
    const totalPage = Math.ceil(totalCounts / rowPerPage);
    let pagination = {
      totalCounts: totalCounts,
      page: page,
      rowPerPage: rowPerPage,
      totalPages: totalPage,
    };

    return res.status(200).send({ result, pagination });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getPersonalInfo;
