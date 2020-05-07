const CRP_REGEX = /^\d{0,7}(\.\d{0,2})?$/;
const MAX_NUMBER=9999.99;
const MIN_NUMBER="0";
const VALID_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const ALLOWED_KEY_CODES = [8,9,13];
const DISALLOWED_KEY_CODES = [69];
const DISALLOWED_KEYS = ["+","-","_",","];
const UNAUTHORIZED_TITLE = 'Unauthorized';
const UNAUTHORIZED_MSG = 'You are not authorized to view the application, please close the browser and relogin';
const agGridKey = 'CompanyName=7 Eleven, Inc. (Irving, TX),LicensedGroup=RIS20-StoreSystems,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=10,LicensedProductionInstancesCount=1,AssetReference=AG-007416,ExpiryDate=18_March_2021_[v2]_MTYxNjAyNTYwMDAwMA==c0defe8f0a2f52abc5f83173cafe53be';

export {
    CRP_REGEX,
    MAX_NUMBER,
    MIN_NUMBER,
    VALID_KEYS,
    ALLOWED_KEY_CODES,
    DISALLOWED_KEY_CODES,
    DISALLOWED_KEYS,
    UNAUTHORIZED_TITLE,
    UNAUTHORIZED_MSG,
    agGridKey
}