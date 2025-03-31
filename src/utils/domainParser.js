const { parse } = require("tldts");

const extractDomain = (url) => {
  const domain = parse(url).domainWithoutSuffix;
  return domain ? domain : url;
};

// const testUrls = [
//   "https://example.com", // ✅ Normal domain
//   "https://sub.example.co.uk", // ✅ Subdomain with multi-level TLD
//   "http://localhost:3000", // ⚠ Localhost (should return null or "localhost")
//   "ftp://user:pass@ftp.example.com:21/path", // ✅ FTP URL with auth & port
//   "https://192.168.1.1/login", // ⚠ IP address (should return null or IP)
//   "https://www.政府.cn", // ✅ Internationalized domain (IDN)
//   "https://example.com.", // ✅ Trailing dot (should return "example.com")
//   "https://github.com:443", // ✅ Domain with explicit port
//   "https:///github.com", // ❌ Malformed URL (double `//`)
//   "https://docs.google.com/", // ❌ Malformed URL (missing `//`)
//   "google", // ❌ Malformed URL (missing `//`)
// ];

// testUrls.forEach((domain) => console.log(extractDomain(domain)));
// export modules

module.exports = { extractDomain };
