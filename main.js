var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PrivacyGuardPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var TEXT = {
  lockProtectedContent: { zh: "\u7ACB\u5373\u9501\u5B9A\u53D7\u4FDD\u62A4\u5185\u5BB9", en: "Lock protected content now" },
  unlockProtectedContent: { zh: "\u89E3\u9501\u53D7\u4FDD\u62A4\u5185\u5BB9", en: "Unlock protected content" },
  manualUnlock: { zh: "\u624B\u52A8\u89E3\u9501", en: "Manual unlock" },
  lockedNotice: { zh: "\u5DF2\u9501\u5B9A\u53D7\u4FDD\u62A4\u5185\u5BB9", en: "Protected content locked" },
  pageOpenReason: { zh: "\u6253\u5F00\u9875\u9762", en: "Opening page" },
  pageLocked: { zh: "\u9875\u9762\u5DF2\u4FDD\u62A4", en: "Page protected" },
  unlockButton: { zh: "\u8F93\u5165\u5BC6\u7801\u89E3\u9501", en: "Enter password to unlock" },
  needPassword: { zh: "\u9700\u8981\u5BC6\u7801", en: "Password required" },
  firstUse: { zh: "\u8FD9\u662F\u7B2C\u4E00\u6B21\u4F7F\u7528\uFF0C\u8BF7\u5148\u8BBE\u7F6E\u4FDD\u62A4\u5BC6\u7801\u3002", en: "Set a protection password first." },
  enterPassword: { zh: "\u8F93\u5165\u5BC6\u7801", en: "Enter password" },
  unlock: { zh: "\u89E3\u9501", en: "Unlock" },
  wrongPassword: { zh: "\u5BC6\u7801\u9519\u8BEF\uFF0C\u672C\u6B21\u4E0D\u4F1A\u6253\u5F00\u53D7\u4FDD\u62A4\u5185\u5BB9", en: "Wrong password. Protected content will stay closed." },
  setPassword: { zh: "\u8BBE\u7F6E\u5BC6\u7801", en: "Set password" },
  newPassword: { zh: "\u8BBE\u7F6E\u5BC6\u7801", en: "Set password" },
  confirmPassword: { zh: "\u518D\u6B21\u8F93\u5165\u5BC6\u7801", en: "Confirm password" },
  savePasswordUnlock: { zh: "\u4FDD\u5B58\u5BC6\u7801\u5E76\u89E3\u9501", en: "Save password and unlock" },
  emptyPassword: { zh: "\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A", en: "Password cannot be empty" },
  passwordMismatch: { zh: "\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4", en: "The passwords do not match" },
  protectedPreview: { zh: "\u53D7\u4FDD\u62A4\u9884\u89C8", en: "Protected preview" },
  protectedBacklinks: { zh: "\u53D7\u4FDD\u62A4\u53CD\u94FE", en: "Protected backlinks" },
  searchProtected: { zh: "\u641C\u7D22\u5230\u53D7\u4FDD\u62A4\u5185\u5BB9", en: "Protected content found in search" },
  passwordRequired: { zh: "\u9700\u8981\u5BC6\u7801", en: "Password required" },
  passwordUpdated: { zh: "\u4FDD\u62A4\u5BC6\u7801\u5DF2\u66F4\u65B0", en: "Protection password updated" },
  resetAllCredentials: { zh: "\u91CD\u7F6E\u6240\u6709\u5BC6\u7801", en: "Reset all credentials" },
  resetAllCredentialsConfirm: { zh: "\u4F60\u786E\u8BA4\u91CD\u7F6E\u6240\u6709\u5BC6\u7801\uFF1F\u91CD\u7F6E\u540E\u5BC6\u7801\u548C\u4E5D\u5BAB\u683C\u624B\u52BF\u90FD\u4E3A\u7A7A\u3002", en: "Reset all credentials? The password and pattern will both be empty." },
  resetAllCredentialsDone: { zh: "\u6240\u6709\u5BC6\u7801\u5DF2\u91CD\u7F6E\uFF0C\u8BF7\u91CD\u65B0\u8BBE\u7F6E\u89E3\u9501\u51ED\u636E\u3002", en: "All credentials were reset. Set a new unlock credential." },
  tagLock: { zh: "Tag Lock", en: "Tag Lock" },
  protectedTagsName: { zh: "\u53D7\u4FDD\u62A4\u6807\u7B7E", en: "Protected tags" },
  protectedTagsDesc: { zh: "\u9875\u9762\u4E2D\u51FA\u73B0\u5176\u4E2D\u4EFB\u610F\u4E00\u4E2A\u6807\u7B7E\u540E\u4F1A\u89E6\u53D1\u9875\u9762\u4FDD\u62A4\u3002\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982\uFF1A#\u9690\u79C1\u3002", en: "A page is protected when it contains any listed tag. One tag per line, for example: #\u9690\u79C1." },
  protectedFoldersName: { zh: "\u53D7\u4FDD\u62A4\u6587\u4EF6\u5939", en: "Protected folders" },
  protectedFoldersDesc: { zh: "\u8BE5\u8DEF\u5F84\u6587\u4EF6\u5939\u4E0B\u7684\u6240\u6709\u6587\u4EF6\u88AB\u8BBF\u95EE\u65F6\u4F1A\u89E6\u53D1\u9875\u9762\u4FDD\u62A4\u3002\u6BCF\u884C\u4E00\u4E2A\u8DEF\u5F84\uFF0C\u5982\uFF1A\u65E5\u8BB0\u3002", en: "Accessing any file under a listed folder triggers protection. One path per line, for example: \u65E5\u8BB0." },
  unlockDurationName: { zh: "\u89E3\u9501\u6709\u6548\u65F6\u957F", en: "Unlock duration" },
  unlockDurationDesc: { zh: "\u89E3\u9501\u72B6\u6001\u6301\u7EED\u7684\u5206\u949F\u6570\u30020 \u8868\u793A\u672C\u6B21 Obsidian \u8FD0\u884C\u671F\u95F4\u4E0D\u4F1A\u81EA\u52A8\u8FC7\u671F\u3002", en: "Minutes before the in-memory unlock expires. 0 means it never expires during the Obsidian run." },
  keepUnlockName: { zh: "\u89E3\u9501\u6709\u6548\u671F\u5185\u91CD\u542F\u4FDD\u6301\u89E3\u9501\u72B6\u6001", en: "Keep unlock across restart" },
  keepUnlockDesc: { zh: "\u5173\u95ED\u201C\u91CD\u542F\u540E\u7ACB\u5373\u9501\u5B9A\u201D\u65F6\uFF0C\u89E3\u9501\u6709\u6548\u671F\u5185\u91CD\u5F00 Obsidian \u4E0D\u4F1A\u9501\u5B9A\u3002", en: "When restart locking is off, reopening Obsidian during the unlock period stays unlocked." },
  lockRestartName: { zh: "\u91CD\u542F\u540E\u7ACB\u5373\u9501\u5B9A", en: "Lock immediately after restart" },
  lockRestartDesc: { zh: "\u5F53\u89E3\u9501\u6709\u6548\u671F\u5185\u91CD\u542F Obsidian\uFF0C\u5219\u7ED3\u675F\u89E3\u9501\u72B6\u6001\u3002", en: "Restarting Obsidian ends the unlocked state during the unlock period." },
  lockBackgroundName: { zh: "\u5207\u540E\u53F0\u540E\u7ACB\u5373\u9501\u5B9A", en: "Lock after going to background" },
  lockBackgroundDesc: { zh: "Obsidian \u5931\u53BB\u7126\u70B9\u65F6\u7ACB\u5373\u7ED3\u675F\u89E3\u9501\u72B6\u6001\u3002", en: "End the unlocked state when Obsidian loses focus." },
  pageOpenProtectionName: { zh: "\u9875\u9762\u6253\u5F00\u4FDD\u62A4", en: "Protect page opening" },
  pageOpenProtectionDesc: { zh: "\u663E\u793A\u53D7\u4FDD\u62A4\u9875\u9762\u524D\u8981\u6C42\u8F93\u5165\u5BC6\u7801\u3002", en: "Ask for a password before showing a protected page." },
  searchProtectionName: { zh: "\u641C\u7D22\u4FDD\u62A4", en: "Protect search" },
  searchProtectionDesc: { zh: "\u641C\u7D22\u7ED3\u679C\u51FA\u73B0\u53D7\u4FDD\u62A4\u7684\u6587\u4EF6\u65F6\u89E6\u53D1\u9875\u9762\u4FDD\u62A4\u3002", en: "Trigger protection when protected files appear in search results." },
  previewProtectionName: { zh: "\u9875\u9762\u9884\u89C8\u53CA\u53CD\u94FE\u4FDD\u62A4", en: "Protect previews and backlinks" },
  previewProtectionDesc: { zh: "\u53D7\u4FDD\u62A4\u9875\u9762\u9884\u89C8\u6216\u53CD\u94FE\u5217\u8868\u6E32\u67D3\u65F6\u89E6\u53D1\u9875\u9762\u4FDD\u62A4\u3002", en: "Trigger protection when a protected page preview or backlinks list is rendered." },
  tagNamedLinksName: { zh: "\u6807\u7B7E\u540C\u540D\u53CC\u94FE\u4FDD\u62A4", en: "Protect links matching protected tags" },
  tagNamedLinksDesc: { zh: "\u9875\u9762\u4E2D\u51FA\u73B0\u5176\u4E2D\u4EFB\u610F\u4E00\u4E2A\u6807\u7B7E\u540C\u540D\u53CC\u94FE\u540E\u4F1A\u89E6\u53D1\u9875\u9762\u4FDD\u62A4\uFF0C\u5982 [[\u9690\u79C1]]\u3002", en: "A page is protected when it contains a wikilink matching any protected tag, such as [[\u9690\u79C1]]." },
  languageName: { zh: "\u754C\u9762\u8BED\u8A00", en: "Interface language" },
  languageDesc: { zh: "\u9009\u62E9\u81EA\u52A8\u8DDF\u968F\u7CFB\u7EDF\u3001\u4E2D\u6587\u6216 English\u3002", en: "Choose automatic system language, \u4E2D\u6587, or English." },
  languageAuto: { zh: "\u81EA\u52A8", en: "Auto" },
  languageChinese: { zh: "\u4E2D\u6587", en: "\u4E2D\u6587" },
  languageEnglish: { zh: "English", en: "English" },
  passwordSettingName: { zh: "\u4FDD\u62A4\u5BC6\u7801", en: "Protection password" },
  passwordSettingDesc: { zh: "\u63D2\u4EF6\u53EA\u4FDD\u5B58\u52A0\u76D0\u540E\u7684\u5BC6\u7801\u54C8\u5E0C\uFF0C\u4E0D\u4FDD\u5B58\u660E\u6587\u5BC6\u7801\u3002", en: "The demo stores a salted password hash, not the plaintext password." },
  changePassword: { zh: "\u4FEE\u6539\u5BC6\u7801", en: "Change password" },
  tagNamedPagesName: { zh: "\u6807\u7B7E\u540C\u540D\u9875\u9762\u4FDD\u62A4", en: "Protect tag-named pages" },
  tagNamedPagesDesc: { zh: "\u4FDD\u62A4\u6587\u4EF6\u540D\u7B49\u4E8E\u53D7\u4FDD\u62A4\u6807\u7B7E\u540D\u79F0\u7684 Markdown \u9875\u9762\uFF0C\u4F8B\u5982\u201C\u9690\u79C1.md\u201D\u3002", en: "Protect Markdown pages whose filename matches a protected tag, such as \u201C\u9690\u79C1.md\u201D." },
  authMethodName: { zh: "\u89E3\u9501\u65B9\u5F0F", en: "Unlock method" },
  authMethodDesc: { zh: "\u9009\u62E9\u5BC6\u7801\u6216\u4E5D\u5BAB\u683C\u624B\u52BF\u8FDB\u884C\u89E3\u9501\u3002", en: "Choose a password or pattern gesture to unlock." },
  authPassword: { zh: "\u5BC6\u7801\u89E3\u9501", en: "Password unlock" },
  authPattern: { zh: "\u4E5D\u5BAB\u683C\u624B\u52BF", en: "Pattern gesture" },
  setupCredential: { zh: "\u8BBE\u7F6E\u89E3\u9501\u5BC6\u7801", en: "Set unlock password" },
  changeCredential: { zh: "\u4FEE\u6539\u89E3\u9501\u5BC6\u7801", en: "Change unlock password" },
  credentialSettingDesc: { zh: "\u6839\u636E\u5F53\u524D\u9009\u62E9\u8BBE\u7F6E\u6216\u4FEE\u6539\u5BC6\u7801\u3001\u4E5D\u5BAB\u683C\u624B\u52BF\u3002", en: "Set or change the password or pattern according to the selected method." },
  save: { zh: "\u4FDD\u5B58", en: "Save" },
  patternHint: { zh: "\u8FDE\u63A5\u81F3\u5C11 4 \u4E2A\u70B9\u6765\u8BBE\u7F6E\u624B\u52BF", en: "Connect at least 4 points to set a pattern" },
  patternConfirmHint: { zh: "\u8BF7\u518D\u6B21\u7ED8\u5236\u76F8\u540C\u624B\u52BF", en: "Draw the same pattern again" },
  patternTooShort: { zh: "\u624B\u52BF\u81F3\u5C11\u9700\u8981\u8FDE\u63A5 4 \u4E2A\u70B9", en: "A pattern must connect at least 4 points" },
  patternMismatch: { zh: "\u4E24\u6B21\u624B\u52BF\u4E0D\u4E00\u81F4", en: "The patterns do not match" },
  patternWrong: { zh: "\u624B\u52BF\u9519\u8BEF\uFF0C\u672C\u6B21\u4E0D\u4F1A\u6253\u5F00\u53D7\u4FDD\u62A4\u5185\u5BB9", en: "Wrong pattern. Protected content will stay closed." },
  cancel: { zh: "\u53D6\u6D88", en: "Cancel" },
  failureActionName: { zh: "\u5BC6\u7801\u9519\u8BEF\u6216\u53D6\u6D88\u540E", en: "After wrong password or cancel" },
  failureActionDesc: { zh: "\u9009\u62E9\u9A8C\u8BC1\u5931\u8D25\u540E\u9875\u9762\u7684\u5904\u7406\u65B9\u5F0F\u3002", en: "Choose what happens after authentication fails or is cancelled." },
  failurePrevious: { zh: "\u8DF3\u8F6C\u5230\u4E0A\u4E00\u4E2A\u9875\u9762", en: "Go to previous page" },
  failureClose: { zh: "\u5173\u95ED\u5F53\u524D\u9875\u9762", en: "Close current page" },
  settingsProtectionName: { zh: "Tag Lock \u8BBE\u7F6E\u9875\u9762\u4FDD\u62A4", en: "Protect Tag Lock settings" },
  settingsProtectionDesc: { zh: "\u6253\u5F00 Tag Lock \u8BBE\u7F6E\u9875\u9762\u65F6\u89E6\u53D1\u9875\u9762\u4FDD\u62A4\u3002", en: "Trigger page protection when opening the Tag Lock settings page." },
  settingsLocked: { zh: "\u8BBE\u7F6E\u9875\u9762\u5DF2\u4FDD\u62A4", en: "Settings are protected" },
  settingsReason: { zh: "\u9A8C\u8BC1\u540E\u624D\u80FD\u67E5\u770B\u6216\u4FEE\u6539 Tag Lock \u8BBE\u7F6E\u3002", en: "Authenticate to view or change Tag Lock settings." },
  passwordHintName: { zh: "\u5BC6\u7801\u63D0\u793A\u8BCD", en: "Password hint" },
  passwordHintDesc: { zh: "\u5C06\u663E\u793A\u5728\u89E3\u9501\u754C\u9762\u4E0A\u7684\u63D0\u793A\u3002", en: "Shown on the unlock screen." },
  passwordHintLabel: { zh: "\u63D0\u793A", en: "Hint" },
  authBlocked: { zh: "\u8FDE\u7EED\u9519\u8BEF\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7\u5728 {seconds} \u79D2\u540E\u518D\u8BD5\u3002", en: "Too many consecutive errors. Try again in {seconds} seconds." },
  rapidPromptClose: { zh: "\u77ED\u65F6\u95F4\u5185\u591A\u6B21\u8BF7\u6C42\u5BC6\u7801\uFF0C\u5DF2\u5173\u95ED\u5F53\u524D\u6807\u7B7E\u3002", en: "The current tab was closed after repeated password prompts." },
  protectionEnabledName: { zh: "\u9875\u9762\u4FDD\u62A4\u603B\u5F00\u5173", en: "Page protection master switch" },
  protectionEnabledDesc: { zh: "\u5F00\u542F\u540E\uFF0C\u6240\u6709\u4FDD\u62A4\u89C4\u5219\u751F\u6548\uFF1B\u5173\u95ED\u540E\u6682\u65F6\u505C\u7528\u9875\u9762\u4FDD\u62A4\u3002", en: "Enable all protection rules; turn off to temporarily disable page protection." },
  unlockOnCorrectCredentialName: { zh: "\u5BC6\u7801\u6B63\u786E\u540E\u7ACB\u5373\u89E3\u9501", en: "Unlock immediately when correct" },
  unlockOnCorrectCredentialDesc: { zh: "\u5BC6\u7801\u586B\u5199\u6B63\u786E\u540E\u8DF3\u8FC7\u70B9\u51FB\u89E3\u9501\u6309\u94AE\u7684\u6B65\u9AA4\u3002", en: "Skip the Unlock button after the credential is entered correctly." },
  forcePasswordEveryAccessName: { zh: "\u5F3A\u5236\u6BCF\u6B21\u8BBF\u95EE\u90FD\u9700\u8981\u5BC6\u7801", en: "Require a password on every access" },
  forcePasswordEveryAccessDesc: { zh: "\u6BCF\u6B21\u6253\u5F00\u53D7\u4FDD\u62A4\u9875\u9762\u90FD\u8981\u6C42\u8FDB\u884C\u5BC6\u7801\u9A8C\u8BC1\u3002", en: "Require verification every time a protected page is opened." },
  failureNone: { zh: "\u65E0\u52A8\u4F5C", en: "No action" },
  categoryPreferences: { zh: "\u9996\u9009\u9879", en: "Preferences" },
  categoryProtectionRules: { zh: "\u4FDD\u62A4\u89C4\u5219", en: "Protection rules" },
  categoryUnlockRules: { zh: "\u89E3\u9501\u89C4\u5219", en: "Unlock rules" },
  categoryLockRules: { zh: "\u9501\u5B9A\u89C4\u5219", en: "Lock rules" },
  categoryInterface: { zh: "\u754C\u9762", en: "Interface" }
};
var DEFAULT_SETTINGS = {
  protectionEnabled: true,
  protectedTags: ["#\u9690\u79C1", "#\u5BC6\u7801"],
  protectedFolders: [],
  unlockMinutes: 30,
  persistUnlockAcrossRestart: true,
  lockOnBackground: false,
  lockOnRestart: true,
  protectPageOpen: true,
  protectSearch: true,
  protectPreview: true,
  protectTagNamedPages: true,
  protectTagNamedLinks: true,
  protectSettings: false,
  authMethod: "password",
  failureAction: "previous",
  passwordHint: "",
  forcePasswordEveryAccess: false,
  unlockOnCorrectCredential: true,
  language: "auto"
};
function normalizeTag(value) {
  return value.trim().replace(/^#+/, "").toLocaleLowerCase();
}
function normalizeFolder(value) {
  return value.trim().replace(/^\/+|\/+$/g, "").replace(/\\/g, "/");
}
function uniqueStrings(values, normalizer) {
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  for (const value of values) {
    const normalized = normalizer(value);
    if (!normalized || seen.has(normalized))
      continue;
    seen.add(normalized);
    result.push(value.trim());
  }
  return result;
}
function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function hashPassword(password, salt) {
  const input = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
var PrivacyGuardPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.passwordHash = "";
    this.passwordSalt = "";
    this.patternHash = "";
    this.patternSalt = "";
    this.unlockedUntil = null;
    this.unlockTimer = null;
    this.promptPromise = null;
    this.searchObservers = /* @__PURE__ */ new Map();
    this.backlinkObservers = /* @__PURE__ */ new Map();
    this.searchPromptKeys = /* @__PURE__ */ new Set();
    this.lastOpenedPath = null;
    this.previousOpenedPath = null;
    this.promptOpeningTimes = [];
    this.forcePromptPath = null;
    this.failedAttempts = 0;
    this.authBlockedUntil = 0;
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new PrivacyGuardSettingTab(this.app, this));
    this.addCommand({
      id: "lock-protected-content",
      name: this.t("lockProtectedContent"),
      callback: () => void this.lockAll()
    });
    this.addCommand({
      id: "unlock-protected-content",
      name: this.t("unlockProtectedContent"),
      callback: () => void this.requestUnlock(this.t("manualUnlock"))
    });
    this.addRibbonIcon("lock", this.t("lockProtectedContent"), () => void this.lockAll());
    this.registerEvent(this.app.workspace.on("file-open", (file) => void this.handleFileOpen(file)));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.refreshActiveView()));
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      this.attachSearchObservers();
      this.attachBacklinkObservers();
      this.refreshActiveView();
    }));
    this.registerDomEvent(document, "visibilitychange", () => {
      if (this.settings.lockOnBackground && document.hidden)
        void this.lockAll();
    });
    this.registerMarkdownPostProcessor((element, context) => this.protectPreview(element, context));
    this.app.workspace.onLayoutReady(() => {
      this.attachSearchObservers();
      this.attachBacklinkObservers();
      this.refreshActiveView();
    });
  }
  getUiLanguage() {
    if (this.settings.language === "zh")
      return "zh";
    if (this.settings.language === "en")
      return "en";
    return navigator.language.toLocaleLowerCase().startsWith("zh") ? "zh" : "en";
  }
  t(key) {
    var _a;
    const entry = (_a = TEXT[key]) != null ? _a : { zh: key, en: key };
    return entry[this.getUiLanguage()];
  }
  async loadSettings() {
    var _a, _b, _c, _d;
    const stored = await this.loadData();
    const storedTags = stored == null ? void 0 : stored.protectedTags;
    const storedFolders = stored == null ? void 0 : stored.protectedFolders;
    this.settings = {
      ...DEFAULT_SETTINGS,
      ...stored,
      protectionEnabled: typeof (stored == null ? void 0 : stored.protectionEnabled) === "boolean" ? stored.protectionEnabled : DEFAULT_SETTINGS.protectionEnabled,
      protectedTags: Array.isArray(storedTags) ? storedTags : DEFAULT_SETTINGS.protectedTags,
      protectedFolders: Array.isArray(storedFolders) ? storedFolders : DEFAULT_SETTINGS.protectedFolders,
      protectTagNamedPages: typeof (stored == null ? void 0 : stored.protectTagNamedPages) === "boolean" ? stored.protectTagNamedPages : DEFAULT_SETTINGS.protectTagNamedPages,
      protectTagNamedLinks: typeof (stored == null ? void 0 : stored.protectTagNamedLinks) === "boolean" ? stored.protectTagNamedLinks : DEFAULT_SETTINGS.protectTagNamedLinks,
      forcePasswordEveryAccess: typeof (stored == null ? void 0 : stored.forcePasswordEveryAccess) === "boolean" ? stored.forcePasswordEveryAccess : DEFAULT_SETTINGS.forcePasswordEveryAccess,
      unlockOnCorrectCredential: typeof (stored == null ? void 0 : stored.unlockOnCorrectCredential) === "boolean" ? stored.unlockOnCorrectCredential : DEFAULT_SETTINGS.unlockOnCorrectCredential,
      authMethod: (stored == null ? void 0 : stored.authMethod) === "pattern" || (stored == null ? void 0 : stored.authMethod) === "password" ? stored.authMethod : DEFAULT_SETTINGS.authMethod,
      protectSettings: typeof (stored == null ? void 0 : stored.protectSettings) === "boolean" ? stored.protectSettings : DEFAULT_SETTINGS.protectSettings,
      failureAction: (stored == null ? void 0 : stored.failureAction) === "previous" || (stored == null ? void 0 : stored.failureAction) === "close" || (stored == null ? void 0 : stored.failureAction) === "none" ? stored.failureAction : DEFAULT_SETTINGS.failureAction,
      passwordHint: typeof (stored == null ? void 0 : stored.passwordHint) === "string" ? stored.passwordHint : DEFAULT_SETTINGS.passwordHint,
      language: (stored == null ? void 0 : stored.language) === "zh" || (stored == null ? void 0 : stored.language) === "en" || (stored == null ? void 0 : stored.language) === "auto" ? stored.language : DEFAULT_SETTINGS.language
    };
    this.passwordHash = (_a = stored == null ? void 0 : stored.passwordHash) != null ? _a : "";
    this.passwordSalt = (_b = stored == null ? void 0 : stored.passwordSalt) != null ? _b : "";
    this.patternHash = (_c = stored == null ? void 0 : stored.patternHash) != null ? _c : "";
    this.patternSalt = (_d = stored == null ? void 0 : stored.patternSalt) != null ? _d : "";
    if (!this.settings.lockOnRestart && this.settings.persistUnlockAcrossRestart) {
      const storedExpiry = typeof (stored == null ? void 0 : stored.unlockExpiresAt) === "number" ? stored.unlockExpiresAt : null;
      if (storedExpiry === 0 || storedExpiry !== null && storedExpiry > Date.now()) {
        this.unlockedUntil = storedExpiry;
        this.scheduleUnlockExpiry();
      }
    }
    if (this.settings.lockOnRestart || !this.settings.persistUnlockAcrossRestart) {
      await this.persistUnlockState(null);
    }
  }
  async saveSettings() {
    this.settings.protectedTags = uniqueStrings(this.settings.protectedTags, normalizeTag);
    this.settings.protectedFolders = uniqueStrings(this.settings.protectedFolders, normalizeFolder);
    if (!this.settings.persistUnlockAcrossRestart) {
      await this.persistUnlockState(null);
    }
    await this.saveData(this.toStoredData());
    this.attachSearchObservers();
    this.attachBacklinkObservers();
    this.refreshActiveView();
    this.refreshPreviewOverlays();
  }
  async setPassword(password) {
    this.passwordSalt = randomSalt();
    this.passwordHash = await hashPassword(password, this.passwordSalt);
    await this.saveData(this.toStoredData());
  }
  async setPattern(pattern) {
    this.patternSalt = randomSalt();
    this.patternHash = await hashPassword(pattern.join(","), this.patternSalt);
    await this.saveData(this.toStoredData());
  }
  async resetAllCredentials() {
    this.passwordHash = "";
    this.passwordSalt = "";
    this.patternHash = "";
    this.patternSalt = "";
    this.resetFailedAttempts();
    this.clearUnlockTimer();
    this.unlockedUntil = null;
    this.searchPromptKeys.clear();
    await this.persistUnlockState(null);
    this.refreshActiveView();
    this.refreshPreviewOverlays();
  }
  hasPassword() {
    return Boolean(this.passwordHash && this.passwordSalt);
  }
  async verifyPassword(password) {
    if (!this.hasPassword())
      return false;
    return await hashPassword(password, this.passwordSalt) === this.passwordHash;
  }
  hasPattern() {
    return Boolean(this.patternHash && this.patternSalt);
  }
  hasCredential() {
    return this.settings.authMethod === "pattern" ? this.hasPattern() : this.hasPassword();
  }
  async verifyPattern(pattern) {
    if (!this.hasPattern())
      return false;
    return await hashPassword(pattern.join(","), this.patternSalt) === this.patternHash;
  }
  async verifyCredential(value) {
    return this.settings.authMethod === "pattern" ? Array.isArray(value) && await this.verifyPattern(value) : typeof value === "string" && await this.verifyPassword(value);
  }
  isUnlocked() {
    if (this.unlockedUntil === null)
      return false;
    if (this.unlockedUntil === 0 || this.unlockedUntil > Date.now())
      return true;
    this.unlockedUntil = null;
    this.searchPromptKeys.clear();
    void this.persistUnlockState(null);
    return false;
  }
  async unlockForConfiguredDuration() {
    this.resetFailedAttempts();
    this.unlockedUntil = this.settings.unlockMinutes === 0 ? 0 : Date.now() + Math.max(1, this.settings.unlockMinutes) * 6e4;
    this.scheduleUnlockExpiry();
    if (!this.settings.lockOnRestart && this.settings.persistUnlockAcrossRestart) {
      await this.persistUnlockState(this.unlockedUntil);
    }
    this.removeLockOverlays();
    this.refreshPreviewOverlays();
  }
  async lockAll() {
    this.clearUnlockTimer();
    this.unlockedUntil = null;
    this.searchPromptKeys.clear();
    await this.persistUnlockState(null);
    this.refreshActiveView();
    this.refreshPreviewOverlays();
    new import_obsidian.Notice(this.t("lockedNotice"));
  }
  isAuthBlocked() {
    if (this.authBlockedUntil === 0)
      return false;
    if (this.authBlockedUntil <= Date.now()) {
      this.authBlockedUntil = 0;
      return false;
    }
    return true;
  }
  getRemainingAuthBlockSeconds() {
    return Math.ceil(Math.max(0, this.authBlockedUntil - Date.now()) / 1e3);
  }
  recordFailedAttempt() {
    this.failedAttempts += 1;
    if (this.failedAttempts % 5 !== 0)
      return;
    this.authBlockedUntil = Date.now() + 3e4;
    new import_obsidian.Notice(this.t("authBlocked").replace("{seconds}", "30"));
  }
  resetFailedAttempts() {
    this.failedAttempts = 0;
    this.authBlockedUntil = 0;
  }
  notePromptOpening() {
    var _a;
    const now = Date.now();
    this.promptOpeningTimes = this.promptOpeningTimes.filter((openedAt) => now - openedAt < 1e3);
    this.promptOpeningTimes.push(now);
    if (this.promptOpeningTimes.length < 3)
      return false;
    this.promptOpeningTimes = [];
    (_a = this.app.workspace.activeLeaf) == null ? void 0 : _a.detach();
    new import_obsidian.Notice(this.t("rapidPromptClose"));
    return true;
  }
  async requestUnlock(reason, applyFailureAction = true, forcePrompt = false) {
    if (!forcePrompt && this.isUnlocked())
      return true;
    if (this.isAuthBlocked()) {
      new import_obsidian.Notice(this.t("authBlocked").replace("{seconds}", String(this.getRemainingAuthBlockSeconds())));
      return false;
    }
    if (this.promptPromise)
      return this.promptPromise;
    if (this.notePromptOpening())
      return false;
    const prompt = new Promise((resolve) => {
      new UnlockModal(this.app, this, reason, resolve).open();
    });
    this.promptPromise = prompt.then((result) => {
      if (!result && applyFailureAction)
        this.applyFailureAction();
      return result;
    }).finally(() => {
      this.promptPromise = null;
    });
    return this.promptPromise;
  }
  toStoredData() {
    var _a;
    return {
      ...this.settings,
      passwordHash: this.passwordHash,
      passwordSalt: this.passwordSalt,
      patternHash: this.patternHash,
      patternSalt: this.patternSalt,
      unlockExpiresAt: this.settings.lockOnRestart || !this.settings.persistUnlockAcrossRestart ? void 0 : (_a = this.unlockedUntil) != null ? _a : void 0
    };
  }
  async persistUnlockState(value) {
    if (value === null)
      this.unlockedUntil = null;
    if (this.settings.lockOnRestart || !this.settings.persistUnlockAcrossRestart) {
      await this.saveData(this.toStoredData());
      return;
    }
    await this.saveData({ ...this.toStoredData(), unlockExpiresAt: value != null ? value : void 0 });
  }
  scheduleUnlockExpiry() {
    this.clearUnlockTimer();
    if (this.unlockedUntil === null || this.unlockedUntil === 0)
      return;
    const remaining = Math.max(0, this.unlockedUntil - Date.now());
    this.unlockTimer = window.setTimeout(() => {
      this.unlockTimer = null;
      this.unlockedUntil = null;
      this.searchPromptKeys.clear();
      void this.persistUnlockState(null);
      this.refreshActiveView();
      this.refreshPreviewOverlays();
      this.searchObservers.forEach((_observer, container) => this.inspectSearchResults(container));
    }, Math.min(remaining, 2147e6));
  }
  clearUnlockTimer() {
    if (this.unlockTimer === null)
      return;
    window.clearTimeout(this.unlockTimer);
    this.unlockTimer = null;
  }
  async handleFileOpen(file) {
    if (file && file.path !== this.lastOpenedPath) {
      this.previousOpenedPath = this.lastOpenedPath;
      this.lastOpenedPath = file.path;
    }
    const protectedFile = Boolean(file && this.settings.protectionEnabled && this.isProtectedFile(file));
    const forcePrompt = Boolean(protectedFile && this.settings.forcePasswordEveryAccess && this.isUnlocked());
    this.forcePromptPath = forcePrompt && file ? file.path : null;
    this.refreshProtectedViews();
    if (!file || !protectedFile || !forcePrompt && this.isUnlocked()) {
      this.forcePromptPath = null;
      return;
    }
    try {
      await this.requestUnlock(this.t("pageOpenReason"), true, forcePrompt);
    } finally {
      this.forcePromptPath = null;
      this.refreshProtectedViews();
    }
  }
  applyFailureAction() {
    var _a;
    if (this.settings.failureAction === "close") {
      (_a = this.app.workspace.activeLeaf) == null ? void 0 : _a.detach();
      return;
    }
    if (this.settings.failureAction === "previous" && this.previousOpenedPath) {
      const previous = this.getFileByPath(this.previousOpenedPath);
      if (previous)
        void this.app.workspace.getLeaf(false).openFile(previous);
    }
  }
  refreshActiveView() {
    this.refreshProtectedViews();
    this.refreshPreviewOverlays();
  }
  refreshProtectedViews() {
    var _a;
    const locked = !this.isUnlocked();
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      const file = view.file;
      const container = (_a = view.containerEl.querySelector(".view-content")) != null ? _a : view.containerEl;
      if ((locked || this.forcePromptPath === (file == null ? void 0 : file.path)) && this.settings.protectionEnabled && file && this.isProtectedFile(file)) {
        this.showViewLock(container, file.path);
      } else {
        this.removeViewLock(container);
      }
    }
  }
  showViewLock(container, path) {
    container.classList.add("privacy-guard-relative");
    let overlay = container.querySelector(".privacy-guard-view-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "privacy-guard-view-overlay";
      overlay.setAttribute("aria-label", this.t("pageLocked"));
      const card = document.createElement("div");
      card.className = "privacy-guard-lock-card";
      const title = document.createElement("h3");
      title.textContent = this.t("pageLocked");
      const description2 = document.createElement("p");
      description2.className = "privacy-guard-lock-path";
      description2.textContent = path;
      const button = document.createElement("button");
      button.className = "mod-cta";
      button.textContent = this.t("unlockButton");
      button.addEventListener("click", () => {
        void this.requestUnlock(this.t("pageOpenReason")).then(() => this.refreshActiveView());
      });
      card.append(title, description2, button);
      overlay.appendChild(card);
      container.appendChild(overlay);
    }
    const description = overlay.querySelector(".privacy-guard-lock-path");
    if (description)
      description.textContent = path;
  }
  removeLockOverlays() {
    this.removeViewLockOverlays();
  }
  removeViewLockOverlays() {
    document.querySelectorAll(".privacy-guard-view-overlay").forEach((element) => element.remove());
    document.querySelectorAll(".privacy-guard-relative").forEach((element) => element.classList.remove("privacy-guard-relative"));
  }
  removeViewLock(container) {
    var _a;
    (_a = container.querySelector(".privacy-guard-view-overlay")) == null ? void 0 : _a.remove();
    container.classList.remove("privacy-guard-relative");
  }
  protectPreview(element, context) {
    if (!this.settings.protectionEnabled || !this.settings.protectPreview)
      return;
    const file = this.getFileByPath(context.sourcePath);
    if (!file || !this.isProtectedFile(file))
      return;
    element.dataset.tagLockPreviewPath = file.path;
    if (this.isUnlocked()) {
      this.removePreviewOverlay(element);
      return;
    }
    this.addPreviewOverlay(element);
  }
  addPreviewOverlay(element) {
    if (element.querySelector(".privacy-guard-preview-overlay"))
      return;
    element.classList.add("privacy-guard-preview-relative");
    const overlay = document.createElement("div");
    overlay.className = "privacy-guard-preview-overlay";
    const label = document.createElement("span");
    label.textContent = this.t("protectedPreview");
    const button = document.createElement("button");
    button.className = "mod-cta";
    button.textContent = this.t("enterPassword");
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      void this.requestUnlock(this.t("protectedPreview")).then(() => this.refreshPreviewOverlays());
    });
    overlay.append(label, button);
    element.appendChild(overlay);
  }
  refreshPreviewOverlays() {
    const locked = this.settings.protectionEnabled && this.settings.protectPreview && !this.isUnlocked();
    document.querySelectorAll("[data-tag-lock-preview-path]").forEach((element) => {
      const path = element.dataset.tagLockPreviewPath;
      const file = path ? this.getFileByPath(path) : null;
      const shouldProtect = locked && file && this.isProtectedFile(file);
      if (shouldProtect)
        this.addPreviewOverlay(element);
      else
        this.removePreviewOverlay(element);
    });
    document.querySelectorAll(".privacy-guard-preview-relative").forEach((element) => {
      if (!element.dataset.tagLockPreviewPath)
        this.removePreviewOverlay(element);
    });
    this.refreshBacklinkOverlays();
  }
  removePreviewOverlay(element) {
    var _a;
    (_a = element.querySelector(".privacy-guard-preview-overlay")) == null ? void 0 : _a.remove();
    element.classList.remove("privacy-guard-preview-relative");
  }
  attachBacklinkObservers() {
    if (!this.settings.protectionEnabled || !this.settings.protectPreview) {
      this.backlinkObservers.forEach((observer) => observer.disconnect());
      this.backlinkObservers.clear();
      this.refreshBacklinkOverlays();
      return;
    }
    const liveContainers = /* @__PURE__ */ new Set();
    for (const leaf of this.app.workspace.getLeavesOfType("backlink")) {
      const container = leaf.view.containerEl;
      liveContainers.add(container);
      if (this.backlinkObservers.has(container))
        continue;
      const observer = new MutationObserver(() => this.refreshBacklinkOverlays());
      observer.observe(container, { childList: true, subtree: true });
      this.backlinkObservers.set(container, observer);
      this.register(() => observer.disconnect());
    }
    this.backlinkObservers.forEach((observer, container) => {
      if (!liveContainers.has(container)) {
        observer.disconnect();
        this.backlinkObservers.delete(container);
      }
    });
    this.refreshBacklinkOverlays();
  }
  refreshBacklinkOverlays() {
    var _a;
    const locked = this.settings.protectionEnabled && this.settings.protectPreview && !this.isUnlocked();
    for (const leaf of this.app.workspace.getLeavesOfType("backlink")) {
      const container = leaf.view.containerEl;
      const view = leaf.view;
      const targetFile = (_a = view.file) != null ? _a : this.app.workspace.getActiveFile();
      const shouldProtect = Boolean(locked && targetFile && this.isProtectedFile(targetFile));
      if (shouldProtect) {
        this.addBacklinkOverlay(container);
      } else {
        this.removeBacklinkOverlay(container);
      }
    }
  }
  addBacklinkOverlay(container) {
    container.classList.add("privacy-guard-backlink-relative");
    if (container.querySelector(".privacy-guard-backlink-overlay"))
      return;
    const overlay = document.createElement("div");
    overlay.className = "privacy-guard-backlink-overlay";
    const label = document.createElement("span");
    label.textContent = this.t("protectedBacklinks");
    const button = document.createElement("button");
    button.className = "mod-cta";
    button.textContent = this.t("enterPassword");
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      void this.requestUnlock(this.t("protectedBacklinks")).then(() => this.refreshBacklinkOverlays());
    });
    overlay.append(label, button);
    container.appendChild(overlay);
  }
  removeBacklinkOverlay(container) {
    var _a;
    (_a = container.querySelector(".privacy-guard-backlink-overlay")) == null ? void 0 : _a.remove();
    container.classList.remove("privacy-guard-backlink-relative");
  }
  attachSearchObservers() {
    if (!this.settings.protectionEnabled || !this.settings.protectSearch) {
      this.searchObservers.forEach((observer) => observer.disconnect());
      this.searchObservers.clear();
      return;
    }
    const liveContainers = /* @__PURE__ */ new Set();
    for (const leaf of this.app.workspace.getLeavesOfType("search")) {
      const container = leaf.view.containerEl;
      liveContainers.add(container);
      if (this.searchObservers.has(container))
        continue;
      const observer = new MutationObserver(() => this.inspectSearchResults(container));
      observer.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["data-path", "class", "aria-label"]
      });
      this.searchObservers.set(container, observer);
      this.register(() => observer.disconnect());
      this.inspectSearchResults(container);
    }
    this.searchObservers.forEach((observer, container) => {
      if (!liveContainers.has(container)) {
        observer.disconnect();
        this.searchObservers.delete(container);
      }
    });
  }
  inspectSearchResults(container) {
    var _a;
    if (!this.settings.protectionEnabled || !this.settings.protectSearch || this.isUnlocked())
      return;
    const paths = /* @__PURE__ */ new Set();
    container.querySelectorAll("[data-path]").forEach((element) => {
      const path = element.getAttribute("data-path");
      if (!path)
        return;
      const file = this.getFileByPath(path);
      if (file && this.isProtectedFile(file))
        paths.add(file.path);
    });
    if (paths.size === 0)
      return;
    const queryInput = container.querySelector("input.search-input, input[type='search']");
    const query = (_a = queryInput == null ? void 0 : queryInput.value.trim()) != null ? _a : "";
    const key = `${query}|${Array.from(paths).sort().join("|")}`;
    if (this.searchPromptKeys.has(key))
      return;
    this.searchPromptKeys.add(key);
    void this.requestUnlock(this.t("searchProtected")).then((unlocked) => {
      if (unlocked) {
        this.clearSearchBlocks(container);
      } else {
        this.blockSearchResults(container, paths);
      }
    });
  }
  blockSearchResults(container, paths) {
    container.querySelectorAll("[data-path]").forEach((element) => {
      const path = element.getAttribute("data-path");
      if (!path || !paths.has(path))
        return;
      const row = element.closest(".tree-item, .search-result-file-title");
      const target = row != null ? row : element;
      target.classList.add("privacy-guard-search-blocked");
      if (!target.querySelector(".privacy-guard-search-badge")) {
        const badge = document.createElement("span");
        badge.className = "privacy-guard-search-badge";
        badge.textContent = this.t("passwordRequired");
        target.appendChild(badge);
      }
    });
  }
  clearSearchBlocks(container) {
    container.querySelectorAll(".privacy-guard-search-blocked").forEach((element) => {
      element.classList.remove("privacy-guard-search-blocked");
      element.querySelectorAll(".privacy-guard-search-badge").forEach((badge) => badge.remove());
    });
  }
  isProtectedFile(file) {
    var _a, _b, _c, _d;
    if (!this.settings.protectionEnabled)
      return false;
    if (file.extension !== "md")
      return false;
    const normalizedPath = file.path.replace(/\\/g, "/");
    const folderMatch = this.settings.protectedFolders.some((folder) => {
      const normalizedFolder = normalizeFolder(folder);
      return normalizedFolder && (normalizedPath === normalizedFolder || normalizedPath.startsWith(`${normalizedFolder}/`));
    });
    if (folderMatch)
      return true;
    const protectedTags = new Set(this.settings.protectedTags.map(normalizeTag));
    if (this.settings.protectTagNamedPages && protectedTags.has(normalizeTag(file.basename)))
      return true;
    const tags = (_b = (_a = this.app.metadataCache.getFileCache(file)) == null ? void 0 : _a.tags) != null ? _b : [];
    if (tags.some((tag) => protectedTags.has(normalizeTag(tag.tag))))
      return true;
    if (!this.settings.protectTagNamedLinks)
      return false;
    const links = (_d = (_c = this.app.metadataCache.getFileCache(file)) == null ? void 0 : _c.links) != null ? _d : [];
    return links.some((link) => {
      var _a2, _b2;
      const linkTarget = link.link.split("#")[0].split("|")[0].trim();
      if (!linkTarget)
        return false;
      const linkedFile = this.app.metadataCache.getFirstLinkpathDest(linkTarget, file.path);
      const linkedBasename = (_b2 = linkedFile == null ? void 0 : linkedFile.basename) != null ? _b2 : (_a2 = linkTarget.replace(/\\/g, "/").split("/").pop()) == null ? void 0 : _a2.replace(/\.md$/i, "");
      return Boolean(linkedBasename && protectedTags.has(normalizeTag(linkedBasename)));
    });
  }
  getFileByPath(path) {
    var _a;
    const normalizedPath = path.replace(/^\//, "");
    const file = (_a = this.app.vault.getAbstractFileByPath(normalizedPath)) != null ? _a : this.app.vault.getAbstractFileByPath(decodeURIComponent(normalizedPath));
    return file instanceof import_obsidian.TFile ? file : null;
  }
};
var PatternInput = class {
  constructor(parent, hint, onComplete) {
    this.nodes = [];
    this.pattern = [];
    this.drawing = false;
    this.onComplete = onComplete;
    const wrapper = document.createElement("div");
    wrapper.className = "tag-lock-pattern-wrapper";
    const hintEl = document.createElement("p");
    hintEl.className = "tag-lock-pattern-hint";
    hintEl.textContent = hint;
    this.board = document.createElement("div");
    this.board.className = "tag-lock-pattern-board";
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.classList.add("tag-lock-pattern-lines");
    this.svg.setAttribute("viewBox", "0 0 300 300");
    this.svg.setAttribute("aria-hidden", "true");
    this.board.appendChild(this.svg);
    for (let index = 0; index < 9; index++) {
      const node = document.createElement("button");
      node.type = "button";
      node.className = "tag-lock-pattern-node";
      node.dataset.index = String(index);
      node.setAttribute("aria-label", String(index + 1));
      this.nodes.push(node);
      this.board.appendChild(node);
    }
    this.board.addEventListener("pointerdown", (event) => this.start(event));
    this.board.addEventListener("pointermove", (event) => this.move(event));
    this.board.addEventListener("pointerup", (event) => this.end(event));
    this.board.addEventListener("pointercancel", (event) => this.end(event));
    wrapper.append(hintEl, this.board);
    parent.appendChild(wrapper);
  }
  getPattern() {
    return [...this.pattern];
  }
  clear() {
    this.pattern = [];
    this.drawing = false;
    this.nodes.forEach((node) => node.classList.remove("is-selected"));
    this.renderLines();
  }
  start(event) {
    event.preventDefault();
    this.clear();
    this.drawing = true;
    this.board.setPointerCapture(event.pointerId);
    this.addNearest(event);
  }
  move(event) {
    if (!this.drawing)
      return;
    event.preventDefault();
    this.addNearest(event);
  }
  end(event) {
    var _a;
    if (!this.drawing)
      return;
    this.drawing = false;
    if (this.board.hasPointerCapture(event.pointerId))
      this.board.releasePointerCapture(event.pointerId);
    if (this.pattern.length >= 4)
      (_a = this.onComplete) == null ? void 0 : _a.call(this, this.getPattern());
  }
  addNearest(event) {
    const rect = this.board.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cellWidth = rect.width / 3;
    const cellHeight = rect.height / 3;
    let nearest = -1;
    let distance = Number.POSITIVE_INFINITY;
    for (let index = 0; index < 9; index++) {
      const centerX = (index % 3 + 0.5) * cellWidth;
      const centerY = (Math.floor(index / 3) + 0.5) * cellHeight;
      const currentDistance = Math.hypot(x - centerX, y - centerY);
      if (currentDistance < distance) {
        distance = currentDistance;
        nearest = index;
      }
    }
    if (nearest < 0 || distance > Math.min(cellWidth, cellHeight) * 0.42 || this.pattern.includes(nearest))
      return;
    this.pattern.push(nearest);
    this.nodes[nearest].classList.add("is-selected");
    this.renderLines();
  }
  renderLines() {
    while (this.svg.firstChild)
      this.svg.removeChild(this.svg.firstChild);
    if (this.pattern.length < 2)
      return;
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    const points = this.pattern.map((index) => `${(index % 3 + 0.5) * 100},${(Math.floor(index / 3) + 0.5) * 100}`).join(" ");
    polyline.setAttribute("points", points);
    polyline.classList.add("tag-lock-pattern-polyline");
    this.svg.appendChild(polyline);
  }
};
var UnlockModal = class extends import_obsidian.Modal {
  constructor(app, plugin, reason, resolveResult) {
    super(app);
    this.settled = false;
    this.immediateChecking = false;
    this.credentialChecking = false;
    this.plugin = plugin;
    this.reason = reason;
    this.resolveResult = resolveResult;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: this.plugin.t("needPassword") });
    contentEl.createEl("p", { text: this.reason });
    const hint = this.plugin.settings.passwordHint.trim();
    if (hint)
      contentEl.createEl("p", { cls: "tag-lock-password-hint", text: `${this.plugin.t("passwordHintLabel")}: ${hint}` });
    if (!this.plugin.hasCredential()) {
      contentEl.createEl("p", { text: this.plugin.t("firstUse") });
      this.renderCredentialSetup(contentEl);
      return;
    }
    if (this.plugin.settings.authMethod === "pattern") {
      this.renderPatternUnlock(contentEl);
    } else {
      this.renderPasswordUnlock(contentEl);
    }
  }
  renderPasswordUnlock(container) {
    const input = container.createEl("input", { type: "password", placeholder: this.plugin.t("enterPassword") });
    input.addClass("tag-lock-password-input");
    const error = container.createEl("p", { cls: "mod-warning" });
    const actions = container.createDiv("tag-lock-modal-actions");
    const button = actions.createEl("button", { text: this.plugin.t("unlock"), cls: "mod-cta" });
    const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
    button.addEventListener("click", () => void this.tryUnlock(input.value, error));
    cancel.addEventListener("click", () => this.finish(false));
    if (this.plugin.settings.unlockOnCorrectCredential) {
      input.addEventListener("input", () => void this.tryImmediatePasswordUnlock(input.value));
    }
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter")
        void this.tryUnlock(input.value, error);
    });
    window.setTimeout(() => input.focus(), 0);
  }
  renderPatternUnlock(container) {
    const pattern = new PatternInput(
      container,
      this.plugin.t("patternHint"),
      this.plugin.settings.unlockOnCorrectCredential ? (value) => void this.tryImmediateCredential(value) : void 0
    );
    const error = container.createEl("p", { cls: "mod-warning" });
    const actions = container.createDiv("tag-lock-modal-actions");
    const button = actions.createEl("button", { text: this.plugin.t("unlock"), cls: "mod-cta" });
    const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
    button.addEventListener("click", () => void this.tryUnlock(pattern.getPattern(), error));
    cancel.addEventListener("click", () => this.finish(false));
  }
  renderCredentialSetup(container) {
    const methodSetting = new import_obsidian.Setting(container).setName(this.plugin.t("authMethodName")).setDesc(this.plugin.t("authMethodDesc"));
    const credentialContainer = container.createDiv("tag-lock-credential-setup");
    methodSetting.addDropdown((dropdown) => dropdown.addOption("password", this.plugin.t("authPassword")).addOption("pattern", this.plugin.t("authPattern")).setValue(this.plugin.settings.authMethod).onChange(async (value) => {
      this.plugin.settings.authMethod = value;
      await this.plugin.saveSettings();
      this.renderCredentialSetupFields(credentialContainer);
    }));
    this.renderCredentialSetupFields(credentialContainer);
  }
  renderCredentialSetupFields(container) {
    container.empty();
    if (this.plugin.settings.authMethod === "pattern") {
      const first = new PatternInput(container, this.plugin.t("patternHint"));
      const second = new PatternInput(container, this.plugin.t("patternConfirmHint"));
      const error2 = container.createEl("p", { cls: "mod-warning" });
      const actions2 = container.createDiv("tag-lock-modal-actions");
      const save2 = actions2.createEl("button", { text: this.plugin.t("savePasswordUnlock"), cls: "mod-cta" });
      const cancel2 = actions2.createEl("button", { text: this.plugin.t("cancel") });
      save2.addEventListener("click", () => {
        const firstPattern = first.getPattern();
        const secondPattern = second.getPattern();
        if (firstPattern.length < 4) {
          error2.textContent = this.plugin.t("patternTooShort");
          return;
        }
        if (firstPattern.join(",") !== secondPattern.join(",")) {
          error2.textContent = this.plugin.t("patternMismatch");
          return;
        }
        void this.plugin.setPattern(firstPattern).then(async () => {
          await this.plugin.unlockForConfiguredDuration();
          this.finish(true);
        });
      });
      cancel2.addEventListener("click", () => this.finish(false));
      return;
    }
    const password = container.createEl("input", { type: "password", placeholder: this.plugin.t("newPassword") });
    const confirmation = container.createEl("input", { type: "password", placeholder: this.plugin.t("confirmPassword") });
    const error = container.createEl("p", { cls: "mod-warning" });
    const actions = container.createDiv("tag-lock-modal-actions");
    const save = actions.createEl("button", { text: this.plugin.t("savePasswordUnlock"), cls: "mod-cta" });
    const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
    save.addEventListener("click", () => {
      if (!password.value) {
        error.textContent = this.plugin.t("emptyPassword");
        return;
      }
      if (password.value !== confirmation.value) {
        error.textContent = this.plugin.t("passwordMismatch");
        return;
      }
      void this.plugin.setPassword(password.value).then(async () => {
        await this.plugin.unlockForConfiguredDuration();
        this.finish(true);
      });
    });
    cancel.addEventListener("click", () => this.finish(false));
    window.setTimeout(() => password.focus(), 0);
  }
  async tryUnlock(value, error) {
    if (this.settled || this.credentialChecking)
      return;
    if (this.plugin.isAuthBlocked()) {
      error.textContent = this.plugin.t("authBlocked").replace("{seconds}", String(this.plugin.getRemainingAuthBlockSeconds()));
      return;
    }
    this.credentialChecking = true;
    if (await this.plugin.verifyCredential(value)) {
      await this.plugin.unlockForConfiguredDuration();
      this.credentialChecking = false;
      this.finish(true);
      return;
    }
    error.textContent = this.plugin.t(this.plugin.settings.authMethod === "pattern" ? "patternWrong" : "wrongPassword");
    this.plugin.recordFailedAttempt();
    this.credentialChecking = false;
    this.finish(false);
  }
  async tryImmediatePasswordUnlock(value) {
    await this.tryImmediateCredential(value);
  }
  async tryImmediateCredential(value) {
    if (!value || this.settled || this.immediateChecking || this.plugin.isAuthBlocked())
      return;
    this.immediateChecking = true;
    const valid = await this.plugin.verifyCredential(value);
    if (valid && !this.settled) {
      await this.plugin.unlockForConfiguredDuration();
      this.immediateChecking = false;
      this.finish(true);
      return;
    }
    this.immediateChecking = false;
  }
  onClose() {
    this.finish(false);
  }
  finish(result) {
    if (this.settled)
      return;
    this.settled = true;
    this.resolveResult(result);
    this.close();
  }
};
var CredentialSetupModal = class extends import_obsidian.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: this.plugin.hasCredential() ? this.plugin.t("changeCredential") : this.plugin.t("setupCredential") });
    if (this.plugin.settings.authMethod === "pattern") {
      this.renderPatternSetup(contentEl);
      return;
    }
    const password = contentEl.createEl("input", { type: "password", placeholder: this.plugin.t("newPassword") });
    const confirmation = contentEl.createEl("input", { type: "password", placeholder: this.plugin.t("confirmPassword") });
    const error = contentEl.createEl("p", { cls: "mod-warning" });
    const actions = contentEl.createDiv("tag-lock-modal-actions");
    const button = actions.createEl("button", { text: this.plugin.t("save"), cls: "mod-cta" });
    const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
    button.addEventListener("click", () => {
      if (!password.value || password.value !== confirmation.value) {
        error.textContent = password.value ? this.plugin.t("passwordMismatch") : this.plugin.t("emptyPassword");
        return;
      }
      void this.plugin.setPassword(password.value).then(() => {
        new import_obsidian.Notice(this.plugin.t("passwordUpdated"));
        this.close();
      });
    });
    cancel.addEventListener("click", () => this.close());
    window.setTimeout(() => password.focus(), 0);
  }
  renderPatternSetup(container) {
    const first = new PatternInput(container, this.plugin.t("patternHint"));
    const second = new PatternInput(container, this.plugin.t("patternConfirmHint"));
    const error = container.createEl("p", { cls: "mod-warning" });
    const actions = container.createDiv("tag-lock-modal-actions");
    const button = actions.createEl("button", { text: this.plugin.t("save"), cls: "mod-cta" });
    const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
    button.addEventListener("click", () => {
      const firstPattern = first.getPattern();
      const secondPattern = second.getPattern();
      if (firstPattern.length < 4) {
        error.textContent = this.plugin.t("patternTooShort");
        return;
      }
      if (firstPattern.join(",") !== secondPattern.join(",")) {
        error.textContent = this.plugin.t("patternMismatch");
        return;
      }
      void this.plugin.setPattern(firstPattern).then(() => {
        new import_obsidian.Notice(this.plugin.t("passwordUpdated"));
        this.close();
      });
    });
    cancel.addEventListener("click", () => this.close());
  }
};
var PrivacyGuardSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    if (this.plugin.settings.protectionEnabled && this.plugin.settings.protectSettings && this.plugin.hasCredential() && !this.plugin.isUnlocked()) {
      this.renderLockedSettings(containerEl);
      return;
    }
    containerEl.createEl("h2", { text: this.plugin.t("tagLock") });
    this.addHeading(containerEl, "categoryPreferences");
    this.addToggle(containerEl, this.plugin.t("protectionEnabledName"), this.plugin.t("protectionEnabledDesc"), "protectionEnabled");
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("languageName")).setDesc(this.plugin.t("languageDesc")).addDropdown((dropdown) => dropdown.addOption("auto", this.plugin.t("languageAuto")).addOption("zh", this.plugin.t("languageChinese")).addOption("en", this.plugin.t("languageEnglish")).setValue(this.plugin.settings.language).onChange(async (value) => {
      this.plugin.settings.language = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    this.addHeading(containerEl, "categoryProtectionRules");
    this.addTextArea(containerEl, "protectedTagsName", "protectedTagsDesc", "protectedTags");
    this.addTextArea(containerEl, "protectedFoldersName", "protectedFoldersDesc", "protectedFolders");
    this.addToggle(containerEl, this.plugin.t("tagNamedLinksName"), this.plugin.t("tagNamedLinksDesc"), "protectTagNamedLinks");
    this.addToggle(containerEl, this.plugin.t("tagNamedPagesName"), this.plugin.t("tagNamedPagesDesc"), "protectTagNamedPages");
    this.addToggle(containerEl, this.plugin.t("searchProtectionName"), this.plugin.t("searchProtectionDesc"), "protectSearch");
    this.addToggle(containerEl, this.plugin.t("previewProtectionName"), this.plugin.t("previewProtectionDesc"), "protectPreview");
    this.addToggle(containerEl, this.plugin.t("settingsProtectionName"), this.plugin.t("settingsProtectionDesc"), "protectSettings");
    this.addHeading(containerEl, "categoryUnlockRules");
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("authMethodName")).setDesc(this.plugin.t("authMethodDesc")).addDropdown((dropdown) => dropdown.addOption("password", this.plugin.t("authPassword")).addOption("pattern", this.plugin.t("authPattern")).setValue(this.plugin.settings.authMethod).onChange(async (value) => {
      this.plugin.settings.authMethod = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.hasCredential() ? this.plugin.t("changeCredential") : this.plugin.t("setupCredential")).setDesc(this.plugin.t("credentialSettingDesc")).addButton((button) => button.setButtonText(this.plugin.hasCredential() ? this.plugin.t("changeCredential") : this.plugin.t("setupCredential")).setCta().onClick(() => new CredentialSetupModal(this.app, this.plugin).open())).addButton((button) => button.setButtonText(this.plugin.t("resetAllCredentials")).setWarning().onClick(async () => {
      if (!window.confirm(this.plugin.t("resetAllCredentialsConfirm")))
        return;
      await this.plugin.resetAllCredentials();
      new import_obsidian.Notice(this.plugin.t("resetAllCredentialsDone"));
      this.display();
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("passwordHintName")).setDesc(this.plugin.t("passwordHintDesc")).addText((text) => text.setValue(this.plugin.settings.passwordHint).onChange(async (value) => {
      this.plugin.settings.passwordHint = value.trim();
      await this.plugin.saveSettings();
    }));
    this.addToggle(containerEl, this.plugin.t("unlockOnCorrectCredentialName"), this.plugin.t("unlockOnCorrectCredentialDesc"), "unlockOnCorrectCredential");
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("failureActionName")).setDesc(this.plugin.t("failureActionDesc")).addDropdown((dropdown) => dropdown.addOption("previous", this.plugin.t("failurePrevious")).addOption("close", this.plugin.t("failureClose")).addOption("none", this.plugin.t("failureNone")).setValue(this.plugin.settings.failureAction).onChange(async (value) => {
      this.plugin.settings.failureAction = value;
      await this.plugin.saveSettings();
    }));
    this.addHeading(containerEl, "categoryLockRules");
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("unlockDurationName")).setDesc(this.plugin.t("unlockDurationDesc")).addText((text) => text.setValue(String(this.plugin.settings.unlockMinutes)).setPlaceholder("30").onChange(async (value) => {
      const parsed = Number(value.trim());
      if (!Number.isFinite(parsed) || parsed < 0)
        return;
      this.plugin.settings.unlockMinutes = Math.floor(parsed);
      await this.plugin.saveSettings();
    }));
    this.addToggle(containerEl, this.plugin.t("lockRestartName"), this.plugin.t("lockRestartDesc"), "lockOnRestart");
    this.addToggle(containerEl, this.plugin.t("lockBackgroundName"), this.plugin.t("lockBackgroundDesc"), "lockOnBackground");
    this.addToggle(containerEl, this.plugin.t("forcePasswordEveryAccessName"), this.plugin.t("forcePasswordEveryAccessDesc"), "forcePasswordEveryAccess");
  }
  renderLockedSettings(container) {
    container.createEl("h2", { text: this.plugin.t("settingsLocked") });
    container.createEl("p", { text: this.plugin.t("settingsReason") });
    new import_obsidian.Setting(container).addButton((button) => button.setButtonText(this.plugin.t("unlockButton")).setCta().onClick(async () => {
      if (await this.plugin.requestUnlock(this.plugin.t("settingsReason"), false))
        this.display();
    }));
  }
  addHeading(container, key) {
    new import_obsidian.Setting(container).setName(this.plugin.t(key)).setHeading();
  }
  addTextArea(container, nameKey, descKey, key) {
    new import_obsidian.Setting(container).setName(this.plugin.t(nameKey)).setDesc(this.plugin.t(descKey)).addTextArea((text) => text.setValue(this.plugin.settings[key].join("\n")).onChange(async (value) => {
      this.plugin.settings[key] = value.split(/\r?\n/);
      await this.plugin.saveSettings();
    }).inputEl.addClass("privacy-guard-setting-list"));
  }
  addToggle(container, name, description, key) {
    new import_obsidian.Setting(container).setName(name).setDesc(description).addToggle((toggle) => toggle.setValue(this.plugin.settings[key]).onChange(async (value) => {
      this.plugin.settings[key] = value;
      await this.plugin.saveSettings();
    }));
  }
};
