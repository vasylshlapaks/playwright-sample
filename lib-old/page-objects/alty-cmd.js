const { community } = require('../selectors/base');
const { click, typeText, waitForText, getText } = require('../helpers/helpers.js');
const { groups, notifications } = require('../helpers/text-helpers');
const { expect } = require('chai');

class AltyCMD {
  constructor(page) {
    this.page = page;
  }
  addGroupToCMD = async (groupLink, promoted = true) => {
    await click(community.ADD_GROUP_BUTTON, this.page);
    await typeText(community.INVITATION_LINK_FIELD, groupLink, this.page);
    if (promoted === false) {
      await click(community.IS_PROMOTED_CHECKBOX, this.page);
    }

    await click(community.ADD_BUTTON, this.page);
    await waitForText(notifications.ADD_GROUP, this.page);
  };

  checkThatTheGroupWasAdded = async (group, expect) => {
    await this.page.waitForTimeout(10000);
    await this.page.reload();
    const groupName = await getText('[class="table-name"]', this.page);
    expect(groupName).toBe(group);
  };
}
module.exports = { AltyCMD };
