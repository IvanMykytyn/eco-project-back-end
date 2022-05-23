const {categoryQuery} = require("./categoryQuery")
const {statusQuery} = require("./statusQuery")
const {amountValidity} = require("./amount")
const {isJWTInHeadersExpired} = require("./jwt")
const {pageQuery} = require("./pageQuery")

module.exports = {
    categoryQuery,
    statusQuery,
    amountValidity,
    isJWTInHeadersExpired,
    pageQuery
}