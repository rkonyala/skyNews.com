class Common {

    formatSectionName(section) {
        return section.replace(/\n/g, '').trim();
    }
}

module.exports = new Common();
// export default Common;