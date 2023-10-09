import 'cypress-iframe';

class LoginPage {

    constructor() {
        this.SIGN_IN_WTH_EMAIL_BUTTON = 'Sign in with Email';
        this.EMAIL_INPUT = 'input[name="email"]';
        this.PASSWORD_INPUT = 'input[name="password"]';
        this.SIGN_IN_BUTTON = '[class*="ant-btn-primary"]';
        this.CREATE_AN_ACCOUNT_LINK = 'a[href="/signup"]';
        this.SIGN_UP_WITH_EMAIL_BUTTON = 'Sign up with Email';

        this.SECTION = '//a[contains(@data-tracking-label,"section")]';
        this.ARTICLE_HEADING = '//main[@id="main"]//div[contains(@class,"h1")]//span';
        this.ALL_SECTION_NAMES = '#main-nav li';
        this.PART_HREF = '//ul[@id="main-nav"]/li/a[@href=';
        let linkText;
    }


    loginWithEmail(email, password) {
        cy.contains(this.SIGN_IN_WTH_EMAIL_BUTTON).click();
        cy.get(this.EMAIL_INPUT).type(email);
        cy.get(this.PASSWORD_INPUT).type(password);
        cy.get(this.SIGN_IN_BUTTON).click();
    }

    formatSectionName(section) {
        return section.replace(/\n/g, '').trim();
    }

    getIframeBody() {
        return cy.get('#sp_message_container_802595 #sp_message_iframe_802595').its('0.contentDocument').its('body').then(cy.wrap)
    }

    availableSectionNames() {
        var items = []
        cy.get(this.ALL_SECTION_NAMES)
            .each(($li) => items.push(this.formatSectionName($li.text())))
            .then(() => {
                cy.log("==== items : " + cy.wrap(items));
                cy.wrap(items).as('allSections');
            })
    }

    validateSectionNames() {
        cy.get('@allSections').then(elements => {
            elements.map(item => {
                cy.xpath(this.SECTION.replace('section', 'nav/' + item)).should('have.text', item);
            });
        });
    }

    relevantArticles(tab) {
        cy.xpath(this.ARTICLE_HEADING).then(($ele) => {
            expect(this.formatSectionName($ele.text().toLowerCase())).contains(tab.toLowerCase());
        })
    }

    verifyDefaultFocus() {
        cy.xpath("//ul[@id='main-nav']/li/a[@aria-current='true']").should('have.attr', 'href', '/')
    }



    clickAcceptAllCookie() {
        cy.wait(1500);
        this.getIframeBody().xpath('//button[@title="Accept all"]').then(($ele) => {
            if ($ele.length > 0) {
                $ele.click();
            }
        })
        cy.wait(1500);
    }

    clickAnotherTab(tab) {
        cy.xpath(this.PART_HREF + "'/" + tab + "']").click()
    }

    verifyFocus(tab) {
        cy.xpath("//ul[@id='main-nav']/li/a[@aria-current='true']").should('have.attr', 'href', '/' + tab)
    }

    selectArticle(tab) {
        // cy.xpath("//ul[@id='main-nav']/li/a[@href='/travel']").click()
        this.clickAnotherTab(tab);
        cy.get("div[data-type='hero-horizontal'] span.sdc-site-tile__headline-text").then(($div) => {
            this.linkText = $div.text();
        });
        cy.xpath("//div[@data-type='hero-horizontal']//span[@class='sdc-site-tile__headline-text']/parent::a[@href]").click()
    }

    verifyArticleTitle() {
        cy.log('Link TEXT : ' + this.linkText)
        cy.xpath('//h1/span').invoke('text').then(($heading) => {
            cy.log('Article Heading: ' + $heading)
            expect($heading.replace(/\*/g, '')).contains(this.linkText)
        })
    }
}

module.exports = new LoginPage();
// export default LoginPage;
