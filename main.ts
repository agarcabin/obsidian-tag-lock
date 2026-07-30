import {
	App,
	MarkdownView,
	MarkdownPostProcessorContext,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFile,
} from "obsidian";

type LanguageMode = "auto" | "zh" | "en";
type UiLanguage = "zh" | "en";
type AuthMethod = "password" | "pattern";
type FailureAction = "previous" | "close" | "none";

const TEXT: Record<string, { zh: string; en: string }> = {
	lockProtectedContent: { zh: "立即锁定受保护内容", en: "Lock protected content now" },
	unlockProtectedContent: { zh: "解锁受保护内容", en: "Unlock protected content" },
	manualUnlock: { zh: "手动解锁", en: "Manual unlock" },
	lockedNotice: { zh: "已锁定受保护内容", en: "Protected content locked" },
	pageOpenReason: { zh: "打开页面", en: "Opening page" },
	pageLocked: { zh: "页面已保护", en: "Page protected" },
	unlockButton: { zh: "输入密码解锁", en: "Enter password to unlock" },
	needPassword: { zh: "需要密码", en: "Password required" },
	firstUse: { zh: "这是第一次使用，请先设置保护密码。", en: "Set a protection password first." },
	enterPassword: { zh: "输入密码", en: "Enter password" },
	unlock: { zh: "解锁", en: "Unlock" },
	wrongPassword: { zh: "密码错误，本次不会打开受保护内容", en: "Wrong password. Protected content will stay closed." },
	setPassword: { zh: "设置密码", en: "Set password" },
	newPassword: { zh: "设置密码", en: "Set password" },
	confirmPassword: { zh: "再次输入密码", en: "Confirm password" },
	savePasswordUnlock: { zh: "保存密码并解锁", en: "Save password and unlock" },
	emptyPassword: { zh: "密码不能为空", en: "Password cannot be empty" },
	passwordMismatch: { zh: "两次密码不一致", en: "The passwords do not match" },
	protectedPreview: { zh: "受保护预览", en: "Protected preview" },
	protectedBacklinks: { zh: "受保护反链", en: "Protected backlinks" },
	searchProtected: { zh: "搜索到受保护内容", en: "Protected content found in search" },
	passwordRequired: { zh: "需要密码", en: "Password required" },
	passwordUpdated: { zh: "保护密码已更新", en: "Protection password updated" },
	resetAllCredentials: { zh: "重置所有密码", en: "Reset all credentials" },
	resetAllCredentialsConfirm: { zh: "你确认重置所有密码？重置后密码和九宫格手势都为空。", en: "Reset all credentials? The password and pattern will both be empty." },
	resetAllCredentialsDone: { zh: "所有密码已重置，请重新设置解锁凭据。", en: "All credentials were reset. Set a new unlock credential." },
	tagLock: { zh: "Tag Lock", en: "Tag Lock" },
	protectedTagsName: { zh: "受保护标签", en: "Protected tags" },
	protectedTagsDesc: { zh: "页面中出现其中任意一个标签后会触发页面保护。每行一个标签，如：#隐私。", en: "A page is protected when it contains any listed tag. One tag per line, for example: #隐私." },
	protectedFoldersName: { zh: "受保护文件夹", en: "Protected folders" },
	protectedFoldersDesc: { zh: "该路径文件夹下的所有文件被访问时会触发页面保护。每行一个路径，如：日记。", en: "Accessing any file under a listed folder triggers protection. One path per line, for example: 日记." },
	unlockDurationName: { zh: "解锁有效时长", en: "Unlock duration" },
	unlockDurationDesc: { zh: "解锁状态持续的分钟数。0 表示本次 Obsidian 运行期间不会自动过期。", en: "Minutes before the in-memory unlock expires. 0 means it never expires during the Obsidian run." },
	keepUnlockName: { zh: "解锁有效期内重启保持解锁状态", en: "Keep unlock across restart" },
	keepUnlockDesc: { zh: "关闭“重启后立即锁定”时，解锁有效期内重开 Obsidian 不会锁定。", en: "When restart locking is off, reopening Obsidian during the unlock period stays unlocked." },
	lockRestartName: { zh: "重启后立即锁定", en: "Lock immediately after restart" },
	lockRestartDesc: { zh: "当解锁有效期内重启 Obsidian，则结束解锁状态。", en: "Restarting Obsidian ends the unlocked state during the unlock period." },
	lockBackgroundName: { zh: "切后台后立即锁定", en: "Lock after going to background" },
	lockBackgroundDesc: { zh: "Obsidian 失去焦点时立即结束解锁状态。", en: "End the unlocked state when Obsidian loses focus." },
	pageOpenProtectionName: { zh: "页面打开保护", en: "Protect page opening" },
	pageOpenProtectionDesc: { zh: "显示受保护页面前要求输入密码。", en: "Ask for a password before showing a protected page." },
	searchProtectionName: { zh: "搜索保护", en: "Protect search" },
	searchProtectionDesc: { zh: "搜索结果出现受保护的文件时触发页面保护。", en: "Trigger protection when protected files appear in search results." },
	previewProtectionName: { zh: "页面预览及反链保护", en: "Protect previews and backlinks" },
	previewProtectionDesc: { zh: "受保护页面预览或反链列表渲染时触发页面保护。", en: "Trigger protection when a protected page preview or backlinks list is rendered." },
	tagNamedLinksName: { zh: "标签同名双链保护", en: "Protect links matching protected tags" },
	tagNamedLinksDesc: { zh: "页面中出现其中任意一个标签同名双链后会触发页面保护，如 [[隐私]]。", en: "A page is protected when it contains a wikilink matching any protected tag, such as [[隐私]]." },
	languageName: { zh: "界面语言", en: "Interface language" },
	languageDesc: { zh: "选择自动跟随系统、中文或 English。", en: "Choose automatic system language, 中文, or English." },
	languageAuto: { zh: "自动", en: "Auto" },
	languageChinese: { zh: "中文", en: "中文" },
	languageEnglish: { zh: "English", en: "English" },
	passwordSettingName: { zh: "保护密码", en: "Protection password" },
	passwordSettingDesc: { zh: "插件只保存加盐后的密码哈希，不保存明文密码。", en: "The demo stores a salted password hash, not the plaintext password." },
	changePassword: { zh: "修改密码", en: "Change password" },
	tagNamedPagesName: { zh: "标签同名页面保护", en: "Protect tag-named pages" },
	tagNamedPagesDesc: { zh: "保护文件名等于受保护标签名称的 Markdown 页面，例如“隐私.md”。", en: "Protect Markdown pages whose filename matches a protected tag, such as “隐私.md”." },
	authMethodName: { zh: "解锁方式", en: "Unlock method" },
	authMethodDesc: { zh: "选择密码或九宫格手势进行解锁。", en: "Choose a password or pattern gesture to unlock." },
	authPassword: { zh: "密码解锁", en: "Password unlock" },
	authPattern: { zh: "九宫格手势", en: "Pattern gesture" },
	setupCredential: { zh: "设置解锁密码", en: "Set unlock password" },
	changeCredential: { zh: "修改解锁密码", en: "Change unlock password" },
	credentialSettingDesc: { zh: "根据当前选择设置或修改密码、九宫格手势。", en: "Set or change the password or pattern according to the selected method." },
	save: { zh: "保存", en: "Save" },
	patternHint: { zh: "连接至少 4 个点来设置手势", en: "Connect at least 4 points to set a pattern" },
	patternConfirmHint: { zh: "请再次绘制相同手势", en: "Draw the same pattern again" },
	patternTooShort: { zh: "手势至少需要连接 4 个点", en: "A pattern must connect at least 4 points" },
	patternMismatch: { zh: "两次手势不一致", en: "The patterns do not match" },
	patternWrong: { zh: "手势错误，本次不会打开受保护内容", en: "Wrong pattern. Protected content will stay closed." },
	cancel: { zh: "取消", en: "Cancel" },
	failureActionName: { zh: "密码错误或取消后", en: "After wrong password or cancel" },
	failureActionDesc: { zh: "选择验证失败后页面的处理方式。", en: "Choose what happens after authentication fails or is cancelled." },
	failurePrevious: { zh: "跳转到上一个页面", en: "Go to previous page" },
	failureClose: { zh: "关闭当前页面", en: "Close current page" },
	settingsProtectionName: { zh: "Tag Lock 设置页面保护", en: "Protect Tag Lock settings" },
	settingsProtectionDesc: { zh: "打开 Tag Lock 设置页面时触发页面保护。", en: "Trigger page protection when opening the Tag Lock settings page." },
	settingsLocked: { zh: "设置页面已保护", en: "Settings are protected" },
	settingsReason: { zh: "验证后才能查看或修改 Tag Lock 设置。", en: "Authenticate to view or change Tag Lock settings." },
	passwordHintName: { zh: "密码提示词", en: "Password hint" },
	passwordHintDesc: { zh: "将显示在解锁界面上的提示。", en: "Shown on the unlock screen." },
	passwordHintLabel: { zh: "提示", en: "Hint" },
	authBlocked: { zh: "连续错误次数过多，请在 {seconds} 秒后再试。", en: "Too many consecutive errors. Try again in {seconds} seconds." },
	rapidPromptClose: { zh: "短时间内多次请求密码，已关闭当前标签。", en: "The current tab was closed after repeated password prompts." },
	protectionEnabledName: { zh: "页面保护总开关", en: "Page protection master switch" },
	protectionEnabledDesc: { zh: "开启后，所有保护规则生效；关闭后暂时停用页面保护。", en: "Enable all protection rules; turn off to temporarily disable page protection." },
	unlockOnCorrectCredentialName: { zh: "密码正确后立即解锁", en: "Unlock immediately when correct" },
	unlockOnCorrectCredentialDesc: { zh: "密码填写正确后跳过点击解锁按钮的步骤。", en: "Skip the Unlock button after the credential is entered correctly." },
	forcePasswordEveryAccessName: { zh: "强制每次访问都需要密码", en: "Require a password on every access" },
	forcePasswordEveryAccessDesc: { zh: "每次打开受保护页面都要求进行密码验证。", en: "Require verification every time a protected page is opened." },
	failureNone: { zh: "无动作", en: "No action" },
	categoryPreferences: { zh: "首选项", en: "Preferences" },
	categoryProtectionRules: { zh: "保护规则", en: "Protection rules" },
	categoryUnlockRules: { zh: "解锁规则", en: "Unlock rules" },
	categoryLockRules: { zh: "锁定规则", en: "Lock rules" },
	categoryInterface: { zh: "界面", en: "Interface" },
};

interface PrivacyGuardSettings {
	protectionEnabled: boolean;
	protectedTags: string[];
	protectedFolders: string[];
	unlockMinutes: number;
	persistUnlockAcrossRestart: boolean;
	lockOnBackground: boolean;
	lockOnRestart: boolean;
	protectPageOpen: boolean;
	protectSearch: boolean;
	protectPreview: boolean;
	protectTagNamedPages: boolean;
	protectTagNamedLinks: boolean;
	protectSettings: boolean;
	forcePasswordEveryAccess: boolean;
	unlockOnCorrectCredential: boolean;
	authMethod: AuthMethod;
	failureAction: FailureAction;
	passwordHint: string;
	language: LanguageMode;
}

interface StoredData extends PrivacyGuardSettings {
	passwordHash?: string;
	passwordSalt?: string;
	patternHash?: string;
	patternSalt?: string;
	unlockExpiresAt?: number;
}

const DEFAULT_SETTINGS: PrivacyGuardSettings = {
	protectionEnabled: true,
	protectedTags: ["#隐私", "#密码"],
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
	language: "auto",
};

function normalizeTag(value: string): string {
	return value.trim().replace(/^#+/, "").toLocaleLowerCase();
}

function normalizeFolder(value: string): string {
	return value.trim().replace(/^\/+|\/+$/g, "").replace(/\\/g, "/");
}

function uniqueStrings(values: string[], normalizer: (value: string) => string): string[] {
	const result: string[] = [];
	const seen = new Set<string>();
	for (const value of values) {
		const normalized = normalizer(value);
		if (!normalized || seen.has(normalized)) continue;
		seen.add(normalized);
		result.push(value.trim());
	}
	return result;
}

function randomSalt(): string {
	return bytesToHex(window.crypto.getRandomValues(new Uint8Array(16)));
}

async function hashPassword(password: string, salt: string): Promise<string> {
	const input = new TextEncoder().encode(`${salt}:${password}`);
	const digest = await window.crypto.subtle.digest("SHA-256", input);
	return bytesToHex(new Uint8Array(digest));
}

function bytesToHex(bytes: Uint8Array): string {
	let result = "";
	for (const byte of bytes) result += byte.toString(16).padStart(2, "0");
	return result;
}

export default class PrivacyGuardPlugin extends Plugin {
	settings: PrivacyGuardSettings = { ...DEFAULT_SETTINGS };
	private passwordHash = "";
	private passwordSalt = "";
	private patternHash = "";
	private patternSalt = "";
	private unlockedUntil: number | null = null;
	private unlockTimer: number | null = null;
	private promptPromise: Promise<boolean> | null = null;
	private searchObservers = new Map<HTMLElement, MutationObserver>();
	private backlinkObservers = new Map<HTMLElement, MutationObserver>();
	private searchPromptKeys = new Set<string>();
	private lastOpenedPath: string | null = null;
	private previousOpenedPath: string | null = null;
	private promptOpeningTimes: number[] = [];
	private forcePromptPath: string | null = null;
	private failedAttempts = 0;
	private authBlockedUntil = 0;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.addSettingTab(new PrivacyGuardSettingTab(this.app, this));
		this.addCommand({
			id: "lock-protected-content",
			name: this.t("lockProtectedContent"),
			callback: () => void this.lockAll(),
		});
		this.addCommand({
			id: "unlock-protected-content",
			name: this.t("unlockProtectedContent"),
			callback: () => void this.requestUnlock(this.t("manualUnlock")),
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
			if (this.settings.lockOnBackground && document.hidden) void this.lockAll();
		});

		this.registerMarkdownPostProcessor((element, context) => this.protectPreview(element, context));
		this.app.workspace.onLayoutReady(() => {
			this.attachSearchObservers();
			this.attachBacklinkObservers();
			this.refreshActiveView();
		});
	}

	getUiLanguage(): UiLanguage {
		if (this.settings.language === "zh") return "zh";
		if (this.settings.language === "en") return "en";
		return navigator.language.toLocaleLowerCase().startsWith("zh") ? "zh" : "en";
	}

	t(key: string): string {
		const entry = TEXT[key] ?? { zh: key, en: key };
		return entry[this.getUiLanguage()];
	}

	async loadSettings(): Promise<void> {
		const stored = (await this.loadData()) as Partial<StoredData> | null;
		const storedTags = stored?.protectedTags;
		const storedFolders = stored?.protectedFolders;
		this.settings = {
			...DEFAULT_SETTINGS,
			...stored,
			protectionEnabled: typeof stored?.protectionEnabled === "boolean" ? stored.protectionEnabled : DEFAULT_SETTINGS.protectionEnabled,
			protectedTags: Array.isArray(storedTags) ? storedTags : DEFAULT_SETTINGS.protectedTags,
			protectedFolders: Array.isArray(storedFolders) ? storedFolders : DEFAULT_SETTINGS.protectedFolders,
			protectTagNamedPages: typeof stored?.protectTagNamedPages === "boolean" ? stored.protectTagNamedPages : DEFAULT_SETTINGS.protectTagNamedPages,
			protectTagNamedLinks: typeof stored?.protectTagNamedLinks === "boolean" ? stored.protectTagNamedLinks : DEFAULT_SETTINGS.protectTagNamedLinks,
			forcePasswordEveryAccess: typeof stored?.forcePasswordEveryAccess === "boolean" ? stored.forcePasswordEveryAccess : DEFAULT_SETTINGS.forcePasswordEveryAccess,
			unlockOnCorrectCredential: typeof stored?.unlockOnCorrectCredential === "boolean" ? stored.unlockOnCorrectCredential : DEFAULT_SETTINGS.unlockOnCorrectCredential,
			authMethod: stored?.authMethod === "pattern" || stored?.authMethod === "password" ? stored.authMethod : DEFAULT_SETTINGS.authMethod,
			protectSettings: typeof stored?.protectSettings === "boolean" ? stored.protectSettings : DEFAULT_SETTINGS.protectSettings,
			failureAction: stored?.failureAction === "previous" || stored?.failureAction === "close" || stored?.failureAction === "none"
				? stored.failureAction
				: DEFAULT_SETTINGS.failureAction,
			passwordHint: typeof stored?.passwordHint === "string" ? stored.passwordHint : DEFAULT_SETTINGS.passwordHint,
			language: stored?.language === "zh" || stored?.language === "en" || stored?.language === "auto"
				? stored.language
				: DEFAULT_SETTINGS.language,
		};
		this.passwordHash = stored?.passwordHash ?? "";
		this.passwordSalt = stored?.passwordSalt ?? "";
		this.patternHash = stored?.patternHash ?? "";
		this.patternSalt = stored?.patternSalt ?? "";

		if (!this.settings.lockOnRestart && this.settings.persistUnlockAcrossRestart) {
			const storedExpiry = typeof stored?.unlockExpiresAt === "number" ? stored.unlockExpiresAt : null;
			if (storedExpiry === 0 || (storedExpiry !== null && storedExpiry > Date.now())) {
				this.unlockedUntil = storedExpiry;
				this.scheduleUnlockExpiry();
			}
		}
		if (this.settings.lockOnRestart || !this.settings.persistUnlockAcrossRestart) {
			await this.persistUnlockState(null);
		}
	}

	async saveSettings(): Promise<void> {
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

	async setPassword(password: string): Promise<void> {
		this.passwordSalt = randomSalt();
		this.passwordHash = await hashPassword(password, this.passwordSalt);
		await this.saveData(this.toStoredData());
	}

	async setPattern(pattern: number[]): Promise<void> {
		this.patternSalt = randomSalt();
		this.patternHash = await hashPassword(pattern.join(","), this.patternSalt);
		await this.saveData(this.toStoredData());
	}

	async resetAllCredentials(): Promise<void> {
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

	hasPassword(): boolean {
		return Boolean(this.passwordHash && this.passwordSalt);
	}

	async verifyPassword(password: string): Promise<boolean> {
		if (!this.hasPassword()) return false;
		return (await hashPassword(password, this.passwordSalt)) === this.passwordHash;
	}

	hasPattern(): boolean {
		return Boolean(this.patternHash && this.patternSalt);
	}

	hasCredential(): boolean {
		return this.settings.authMethod === "pattern" ? this.hasPattern() : this.hasPassword();
	}

	async verifyPattern(pattern: number[]): Promise<boolean> {
		if (!this.hasPattern()) return false;
		return (await hashPassword(pattern.join(","), this.patternSalt)) === this.patternHash;
	}

	async verifyCredential(value: string | number[]): Promise<boolean> {
		return this.settings.authMethod === "pattern"
			? Array.isArray(value) && await this.verifyPattern(value)
			: typeof value === "string" && await this.verifyPassword(value);
	}

	isUnlocked(): boolean {
		if (this.unlockedUntil === null) return false;
		if (this.unlockedUntil === 0 || this.unlockedUntil > Date.now()) return true;
		this.unlockedUntil = null;
		this.searchPromptKeys.clear();
		void this.persistUnlockState(null);
		return false;
	}

	async unlockForConfiguredDuration(): Promise<void> {
		this.resetFailedAttempts();
		this.unlockedUntil = this.settings.unlockMinutes === 0
			? 0
			: Date.now() + Math.max(1, this.settings.unlockMinutes) * 60_000;
		this.scheduleUnlockExpiry();
		if (!this.settings.lockOnRestart && this.settings.persistUnlockAcrossRestart) {
			await this.persistUnlockState(this.unlockedUntil);
		}
		this.removeLockOverlays();
		this.refreshPreviewOverlays();
	}

	async lockAll(): Promise<void> {
		this.clearUnlockTimer();
		this.unlockedUntil = null;
		this.searchPromptKeys.clear();
		await this.persistUnlockState(null);
		this.refreshActiveView();
		this.refreshPreviewOverlays();
		new Notice(this.t("lockedNotice"));
	}

	isAuthBlocked(): boolean {
		if (this.authBlockedUntil === 0) return false;
		if (this.authBlockedUntil <= Date.now()) {
			this.authBlockedUntil = 0;
			return false;
		}
		return true;
	}

	getRemainingAuthBlockSeconds(): number {
		return Math.ceil(Math.max(0, this.authBlockedUntil - Date.now()) / 1000);
	}

	recordFailedAttempt(): void {
		this.failedAttempts += 1;
		if (this.failedAttempts % 5 !== 0) return;
		this.authBlockedUntil = Date.now() + 30_000;
		new Notice(this.t("authBlocked").replace("{seconds}", "30"));
	}

	private resetFailedAttempts(): void {
		this.failedAttempts = 0;
		this.authBlockedUntil = 0;
	}

	private notePromptOpening(): boolean {
		const now = Date.now();
		this.promptOpeningTimes = this.promptOpeningTimes.filter((openedAt) => now - openedAt < 1_000);
		this.promptOpeningTimes.push(now);
		if (this.promptOpeningTimes.length < 3) return false;
		this.promptOpeningTimes = [];
		this.app.workspace.getMostRecentLeaf()?.detach();
		new Notice(this.t("rapidPromptClose"));
		return true;
	}

	async requestUnlock(reason: string, applyFailureAction = true, forcePrompt = false): Promise<boolean> {
		if (!forcePrompt && this.isUnlocked()) return true;
		if (this.isAuthBlocked()) {
			new Notice(this.t("authBlocked").replace("{seconds}", String(this.getRemainingAuthBlockSeconds())));
			return false;
		}
		if (this.promptPromise) return this.promptPromise;
		if (this.notePromptOpening()) return false;
		const prompt = new Promise<boolean>((resolve) => {
			new UnlockModal(this.app, this, reason, resolve).open();
		});
		this.promptPromise = prompt.then(
			(result: boolean) => {
				if (!result && applyFailureAction) this.applyFailureAction();
				this.promptPromise = null;
				return result;
			},
			(error: unknown) => {
				this.promptPromise = null;
				throw error;
			},
		);
		return this.promptPromise;
	}

	private toStoredData(): StoredData {
		return {
			...this.settings,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
			patternHash: this.patternHash,
			patternSalt: this.patternSalt,
			unlockExpiresAt: this.settings.lockOnRestart || !this.settings.persistUnlockAcrossRestart
				? undefined
				: this.unlockedUntil ?? undefined,
		};
	}

	private async persistUnlockState(value: number | null): Promise<void> {
		if (value === null) this.unlockedUntil = null;
		if (this.settings.lockOnRestart || !this.settings.persistUnlockAcrossRestart) {
			await this.saveData(this.toStoredData());
			return;
		}
		await this.saveData({ ...this.toStoredData(), unlockExpiresAt: value ?? undefined });
	}

	private scheduleUnlockExpiry(): void {
		this.clearUnlockTimer();
		if (this.unlockedUntil === null || this.unlockedUntil === 0) return;
		const remaining = Math.max(0, this.unlockedUntil - Date.now());
		this.unlockTimer = window.setTimeout(() => {
			this.unlockTimer = null;
			this.unlockedUntil = null;
			this.searchPromptKeys.clear();
			void this.persistUnlockState(null);
			this.refreshActiveView();
			this.refreshPreviewOverlays();
			this.searchObservers.forEach((_observer, container) => this.inspectSearchResults(container));
		}, Math.min(remaining, 2_147_000_000));
	}

	private clearUnlockTimer(): void {
		if (this.unlockTimer === null) return;
		window.clearTimeout(this.unlockTimer);
		this.unlockTimer = null;
	}

	private async handleFileOpen(file: TFile | null): Promise<void> {
		if (file && file.path !== this.lastOpenedPath) {
			this.previousOpenedPath = this.lastOpenedPath;
			this.lastOpenedPath = file.path;
		}
		const protectedFile = Boolean(file && this.settings.protectionEnabled && this.isProtectedFile(file));
		const forcePrompt = Boolean(protectedFile && this.settings.forcePasswordEveryAccess && this.isUnlocked());
		this.forcePromptPath = forcePrompt && file ? file.path : null;
		this.refreshProtectedViews();
		if (!file || !protectedFile || (!forcePrompt && this.isUnlocked())) {
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

	private applyFailureAction(): void {
		if (this.settings.failureAction === "close") {
			this.app.workspace.getMostRecentLeaf()?.detach();
			return;
		}
		if (this.settings.failureAction === "previous" && this.previousOpenedPath) {
			const previous = this.getFileByPath(this.previousOpenedPath);
			if (previous) void this.app.workspace.getLeaf(false).openFile(previous);
		}
	}

	private refreshActiveView(): void {
		this.refreshProtectedViews();
		this.refreshPreviewOverlays();
	}

	private refreshProtectedViews(): void {
		const locked = !this.isUnlocked();
		for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
			const view = leaf.view as MarkdownView;
			const file = view.file;
			const container = view.containerEl.querySelector<HTMLElement>(".view-content") ?? view.containerEl;
			if ((locked || this.forcePromptPath === file?.path) && this.settings.protectionEnabled && file && this.isProtectedFile(file)) {
				this.showViewLock(container, file.path);
			} else {
				this.removeViewLock(container);
			}
		}
	}

	private showViewLock(container: HTMLElement, path: string): void {
		container.classList.add("privacy-guard-relative");
		let overlay = container.querySelector<HTMLElement>(".privacy-guard-view-overlay");
		if (!overlay) {
			const createdOverlay = container.createDiv({ cls: "privacy-guard-view-overlay", attr: { "aria-label": this.t("pageLocked") } });
			const card = createdOverlay.createDiv({ cls: "privacy-guard-lock-card" });
			const title = card.createEl("h3", { text: this.t("pageLocked") });
			const description = card.createEl("p", { cls: "privacy-guard-lock-path", text: path });
			const button = card.createEl("button", { cls: "mod-cta", text: this.t("unlockButton") });
			button.addEventListener("click", () => {
				void this.requestUnlock(this.t("pageOpenReason")).then(() => this.refreshActiveView());
			});
			overlay = createdOverlay;
		}
		if (!overlay) return;
		const description = overlay.querySelector<HTMLElement>(".privacy-guard-lock-path");
		if (description) description.textContent = path;
	}

	private removeLockOverlays(): void {
		this.removeViewLockOverlays();
	}

	private removeViewLockOverlays(): void {
		document.querySelectorAll(".privacy-guard-view-overlay").forEach((element) => element.remove());
		document.querySelectorAll(".privacy-guard-relative").forEach((element) => element.classList.remove("privacy-guard-relative"));
	}

	private removeViewLock(container: HTMLElement): void {
		container.querySelector(".privacy-guard-view-overlay")?.remove();
		container.classList.remove("privacy-guard-relative");
	}

	private protectPreview(element: HTMLElement, context: MarkdownPostProcessorContext): void {
		if (!this.settings.protectionEnabled || !this.settings.protectPreview) return;
		const file = this.getFileByPath(context.sourcePath);
		if (!file || !this.isProtectedFile(file)) return;
		element.dataset.tagLockPreviewPath = file.path;
		if (this.isUnlocked()) {
			this.removePreviewOverlay(element);
			return;
		}
		this.addPreviewOverlay(element);
	}

	private addPreviewOverlay(element: HTMLElement): void {
		if (element.querySelector(".privacy-guard-preview-overlay")) return;
		element.classList.add("privacy-guard-preview-relative");
		const overlay = element.createDiv({ cls: "privacy-guard-preview-overlay" });
		overlay.createSpan({ text: this.t("protectedPreview") });
		const button = overlay.createEl("button", { cls: "mod-cta", text: this.t("enterPassword") });
		button.addEventListener("click", (event: MouseEvent) => {
			event.stopPropagation();
			void this.requestUnlock(this.t("protectedPreview")).then(() => this.refreshPreviewOverlays());
		});
	}

	private refreshPreviewOverlays(): void {
		const locked = this.settings.protectionEnabled && this.settings.protectPreview && !this.isUnlocked();
		document.querySelectorAll<HTMLElement>("[data-tag-lock-preview-path]").forEach((element) => {
			const path = element.dataset.tagLockPreviewPath;
			const file = path ? this.getFileByPath(path) : null;
			const shouldProtect = locked && file && this.isProtectedFile(file);
			if (shouldProtect) this.addPreviewOverlay(element);
			else this.removePreviewOverlay(element);
		});
		document.querySelectorAll<HTMLElement>(".privacy-guard-preview-relative").forEach((element) => {
			if (!element.dataset.tagLockPreviewPath) this.removePreviewOverlay(element);
		});
		this.refreshBacklinkOverlays();
	}

	private removePreviewOverlay(element: HTMLElement): void {
		element.querySelector(".privacy-guard-preview-overlay")?.remove();
		element.classList.remove("privacy-guard-preview-relative");
	}

	private attachBacklinkObservers(): void {
		if (!this.settings.protectionEnabled || !this.settings.protectPreview) {
			this.backlinkObservers.forEach((observer) => observer.disconnect());
			this.backlinkObservers.clear();
			this.refreshBacklinkOverlays();
			return;
		}
		const liveContainers = new Set<HTMLElement>();
		for (const leaf of this.app.workspace.getLeavesOfType("backlink")) {
			const container = leaf.view.containerEl;
			liveContainers.add(container);
			if (this.backlinkObservers.has(container)) continue;
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

	private refreshBacklinkOverlays(): void {
		const locked = this.settings.protectionEnabled && this.settings.protectPreview && !this.isUnlocked();
		for (const leaf of this.app.workspace.getLeavesOfType("backlink")) {
			const container = leaf.view.containerEl;
			const view = leaf.view as { file?: TFile };
			const targetFile = view.file ?? this.app.workspace.getActiveFile();
			const shouldProtect = Boolean(locked && targetFile && this.isProtectedFile(targetFile));
			if (shouldProtect) {
				this.addBacklinkOverlay(container);
			} else {
				this.removeBacklinkOverlay(container);
			}
		}
	}

	private addBacklinkOverlay(container: HTMLElement): void {
		container.classList.add("privacy-guard-backlink-relative");
		if (container.querySelector(".privacy-guard-backlink-overlay")) return;
		const overlay = container.createDiv({ cls: "privacy-guard-backlink-overlay" });
		overlay.createSpan({ text: this.t("protectedBacklinks") });
		const button = overlay.createEl("button", { cls: "mod-cta", text: this.t("enterPassword") });
		button.addEventListener("click", (event: MouseEvent) => {
			event.stopPropagation();
			void this.requestUnlock(this.t("protectedBacklinks")).then(() => this.refreshBacklinkOverlays());
		});
	}

	private removeBacklinkOverlay(container: HTMLElement): void {
		container.querySelector(".privacy-guard-backlink-overlay")?.remove();
		container.classList.remove("privacy-guard-backlink-relative");
	}

	private attachSearchObservers(): void {
		if (!this.settings.protectionEnabled || !this.settings.protectSearch) {
			this.searchObservers.forEach((observer) => observer.disconnect());
			this.searchObservers.clear();
			return;
		}
		const liveContainers = new Set<HTMLElement>();
		for (const leaf of this.app.workspace.getLeavesOfType("search")) {
			const container = leaf.view.containerEl;
			liveContainers.add(container);
			if (this.searchObservers.has(container)) continue;
			const observer = new MutationObserver(() => this.inspectSearchResults(container));
			observer.observe(container, {
				childList: true,
				subtree: true,
				characterData: true,
				attributes: true,
				attributeFilter: ["data-path", "class", "aria-label"],
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

	private inspectSearchResults(container: HTMLElement): void {
		if (!this.settings.protectionEnabled || !this.settings.protectSearch || this.isUnlocked()) return;
		const paths = new Set<string>();
		container.querySelectorAll<HTMLElement>("[data-path]").forEach((element) => {
			const path = element.getAttribute("data-path");
			if (!path) return;
			const file = this.getFileByPath(path);
			if (file && this.isProtectedFile(file)) paths.add(file.path);
		});
		if (paths.size === 0) return;
		const queryInput = container.querySelector<HTMLInputElement>("input.search-input, input[type='search']");
		const query = queryInput?.value.trim() ?? "";
		const key = `${query}|${Array.from(paths).sort().join("|")}`;
		if (this.searchPromptKeys.has(key)) return;
		this.searchPromptKeys.add(key);
		void this.requestUnlock(this.t("searchProtected")).then((unlocked) => {
			if (unlocked) {
				this.clearSearchBlocks(container);
			} else {
				this.blockSearchResults(container, paths);
			}
		});
	}

	private blockSearchResults(container: HTMLElement, paths: Set<string>): void {
		container.querySelectorAll<HTMLElement>("[data-path]").forEach((element) => {
			const path = element.getAttribute("data-path");
			if (!path || !paths.has(path)) return;
			const row = element.closest<HTMLElement>(".tree-item, .search-result-file-title");
			const target = row ?? element;
			target.classList.add("privacy-guard-search-blocked");
			if (!target.querySelector(".privacy-guard-search-badge")) {
				target.createSpan({ cls: "privacy-guard-search-badge", text: this.t("passwordRequired") });
			}
		});
	}

	private clearSearchBlocks(container: HTMLElement): void {
		container.querySelectorAll(".privacy-guard-search-blocked").forEach((element) => {
			element.classList.remove("privacy-guard-search-blocked");
			element.querySelectorAll(".privacy-guard-search-badge").forEach((badge) => badge.remove());
		});
	}

	private isProtectedFile(file: TFile): boolean {
		if (!this.settings.protectionEnabled) return false;
		if (file.extension !== "md") return false;
		const normalizedPath = file.path.replace(/\\/g, "/");
		const folderMatch = this.settings.protectedFolders.some((folder) => {
			const normalizedFolder = normalizeFolder(folder);
			return normalizedFolder && (normalizedPath === normalizedFolder || normalizedPath.startsWith(`${normalizedFolder}/`));
		});
		if (folderMatch) return true;
		const protectedTags = new Set(this.settings.protectedTags.map(normalizeTag));
		if (this.settings.protectTagNamedPages && protectedTags.has(normalizeTag(file.basename))) return true;
		const tags = this.app.metadataCache.getFileCache(file)?.tags ?? [];
		if (tags.some((tag) => protectedTags.has(normalizeTag(tag.tag)))) return true;
		if (!this.settings.protectTagNamedLinks) return false;
		const links = this.app.metadataCache.getFileCache(file)?.links ?? [];
		return links.some((link) => {
			const linkTarget = link.link.split("#")[0].split("|")[0].trim();
			if (!linkTarget) return false;
			const linkedFile = this.app.metadataCache.getFirstLinkpathDest(linkTarget, file.path);
			const linkedBasename = linkedFile?.basename ?? linkTarget.replace(/\\/g, "/").split("/").pop()?.replace(/\.md$/i, "");
			return Boolean(linkedBasename && protectedTags.has(normalizeTag(linkedBasename)));
		});
	}

	private getFileByPath(path: string): TFile | null {
		const normalizedPath = path.replace(/^\//, "");
		const file = this.app.vault.getAbstractFileByPath(normalizedPath)
			?? this.app.vault.getAbstractFileByPath(decodeURIComponent(normalizedPath));
		return file instanceof TFile ? file : null;
	}
}

class PatternInput {
	private readonly board: HTMLDivElement;
	private readonly svg: SVGSVGElement;
	private readonly nodes: HTMLButtonElement[] = [];
	private readonly onComplete?: (pattern: number[]) => void;
	private pattern: number[] = [];
	private drawing = false;

	constructor(parent: HTMLElement, hint: string, onComplete?: (pattern: number[]) => void) {
		this.onComplete = onComplete;
		const wrapper = parent.createDiv({ cls: "tag-lock-pattern-wrapper" });
		wrapper.createEl("p", { cls: "tag-lock-pattern-hint", text: hint });
		this.board = wrapper.createDiv({ cls: "tag-lock-pattern-board" });
		this.svg = this.board.createSvg("svg", {
			cls: "tag-lock-pattern-lines",
			attr: { viewBox: "0 0 300 300", "aria-hidden": "true" },
		});
		for (let index = 0; index < 9; index++) {
			const node = this.board.createEl("button", {
				cls: "tag-lock-pattern-node",
				attr: { type: "button", "data-index": String(index), "aria-label": String(index + 1) },
			});
			this.nodes.push(node);
		}
		this.board.addEventListener("pointerdown", (event) => this.start(event));
		this.board.addEventListener("pointermove", (event) => this.move(event));
		this.board.addEventListener("pointerup", (event) => this.end(event));
		this.board.addEventListener("pointercancel", (event) => this.end(event));
	}

	getPattern(): number[] {
		return [...this.pattern];
	}

	clear(): void {
		this.pattern = [];
		this.drawing = false;
		this.nodes.forEach((node) => node.classList.remove("is-selected"));
		this.renderLines();
	}

	private start(event: PointerEvent): void {
		event.preventDefault();
		this.clear();
		this.drawing = true;
		this.board.setPointerCapture(event.pointerId);
		this.addNearest(event);
	}

	private move(event: PointerEvent): void {
		if (!this.drawing) return;
		event.preventDefault();
		this.addNearest(event);
	}

	private end(event: PointerEvent): void {
		if (!this.drawing) return;
		this.drawing = false;
		if (this.board.hasPointerCapture(event.pointerId)) this.board.releasePointerCapture(event.pointerId);
		if (this.pattern.length >= 4) this.onComplete?.(this.getPattern());
	}

	private addNearest(event: PointerEvent): void {
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
		if (nearest < 0 || distance > Math.min(cellWidth, cellHeight) * 0.42 || this.pattern.indexOf(nearest) >= 0) return;
		this.pattern.push(nearest);
		this.nodes[nearest].classList.add("is-selected");
		this.renderLines();
	}

	private renderLines(): void {
		while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);
		if (this.pattern.length < 2) return;
		const points = this.pattern.map((index) => `${(index % 3 + 0.5) * 100},${(Math.floor(index / 3) + 0.5) * 100}`).join(" ");
		this.svg.createSvg("polyline", { cls: "tag-lock-pattern-polyline", attr: { points } });
	}
}

class UnlockModal extends Modal {
	private readonly plugin: PrivacyGuardPlugin;
	private readonly reason: string;
	private readonly resolveResult: (result: boolean) => void;
	private settled = false;
	private immediateChecking = false;
	private credentialChecking = false;

	constructor(app: App, plugin: PrivacyGuardPlugin, reason: string, resolveResult: (result: boolean) => void) {
		super(app);
		this.plugin = plugin;
		this.reason = reason;
		this.resolveResult = resolveResult;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		new Setting(contentEl).setName(this.plugin.t("needPassword")).setHeading();
		contentEl.createEl("p", { text: this.reason });
		const hint = this.plugin.settings.passwordHint.trim();
		if (hint) contentEl.createEl("p", { cls: "tag-lock-password-hint", text: `${this.plugin.t("passwordHintLabel")}: ${hint}` });
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

	private renderPasswordUnlock(container: HTMLElement): void {
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
			if (event.key === "Enter") void this.tryUnlock(input.value, error);
		});
		window.setTimeout(() => input.focus(), 0);
	}

	private renderPatternUnlock(container: HTMLElement): void {
		const pattern = new PatternInput(
			container,
			this.plugin.t("patternHint"),
			this.plugin.settings.unlockOnCorrectCredential ? (value) => void this.tryImmediateCredential(value) : undefined,
		);
		const error = container.createEl("p", { cls: "mod-warning" });
		const actions = container.createDiv("tag-lock-modal-actions");
		const button = actions.createEl("button", { text: this.plugin.t("unlock"), cls: "mod-cta" });
		const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
		button.addEventListener("click", () => void this.tryUnlock(pattern.getPattern(), error));
		cancel.addEventListener("click", () => this.finish(false));
	}

	private renderCredentialSetup(container: HTMLElement): void {
		const methodSetting = new Setting(container)
			.setName(this.plugin.t("authMethodName"))
			.setDesc(this.plugin.t("authMethodDesc"));
		const credentialContainer = container.createDiv("tag-lock-credential-setup");
		methodSetting.addDropdown((dropdown) => dropdown
			.addOption("password", this.plugin.t("authPassword"))
			.addOption("pattern", this.plugin.t("authPattern"))
			.setValue(this.plugin.settings.authMethod)
			.onChange(async (value) => {
				this.plugin.settings.authMethod = value as AuthMethod;
				await this.plugin.saveSettings();
				this.renderCredentialSetupFields(credentialContainer);
			}));
		this.renderCredentialSetupFields(credentialContainer);
	}

	private renderCredentialSetupFields(container: HTMLElement): void {
		container.empty();
		if (this.plugin.settings.authMethod === "pattern") {
			const first = new PatternInput(container, this.plugin.t("patternHint"));
			const second = new PatternInput(container, this.plugin.t("patternConfirmHint"));
			const error = container.createEl("p", { cls: "mod-warning" });
			const actions = container.createDiv("tag-lock-modal-actions");
			const save = actions.createEl("button", { text: this.plugin.t("savePasswordUnlock"), cls: "mod-cta" });
			const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
			save.addEventListener("click", () => {
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
				void this.plugin.setPattern(firstPattern).then(async () => {
					await this.plugin.unlockForConfiguredDuration();
					this.finish(true);
				});
			});
			cancel.addEventListener("click", () => this.finish(false));
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

	private async tryUnlock(value: string | number[], error: HTMLElement): Promise<void> {
		if (this.settled || this.credentialChecking) return;
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

	private async tryImmediatePasswordUnlock(value: string): Promise<void> {
		await this.tryImmediateCredential(value);
	}

	private async tryImmediateCredential(value: string | number[]): Promise<void> {
		if (!value || this.settled || this.immediateChecking || this.plugin.isAuthBlocked()) return;
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

	onClose(): void {
		this.finish(false);
	}

	private finish(result: boolean): void {
		if (this.settled) return;
		this.settled = true;
		this.resolveResult(result);
		this.close();
	}
}

class CredentialSetupModal extends Modal {
	private readonly plugin: PrivacyGuardPlugin;

	constructor(app: App, plugin: PrivacyGuardPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		new Setting(contentEl)
			.setName(this.plugin.hasCredential() ? this.plugin.t("changeCredential") : this.plugin.t("setupCredential"))
			.setHeading();
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
				new Notice(this.plugin.t("passwordUpdated"));
				this.close();
			});
		});
		cancel.addEventListener("click", () => this.close());
		window.setTimeout(() => password.focus(), 0);
	}

	private renderPatternSetup(container: HTMLElement): void {
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
				new Notice(this.plugin.t("passwordUpdated"));
				this.close();
			});
		});
		cancel.addEventListener("click", () => this.close());
	}
}

class ResetCredentialsConfirmModal extends Modal {
	private readonly plugin: PrivacyGuardPlugin;
	private readonly onConfirm: () => void;

	constructor(app: App, plugin: PrivacyGuardPlugin, onConfirm: () => void) {
		super(app);
		this.plugin = plugin;
		this.onConfirm = onConfirm;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		new Setting(contentEl).setName(this.plugin.t("resetAllCredentials")).setHeading();
		contentEl.createEl("p", { text: this.plugin.t("resetAllCredentialsConfirm") });
		const actions = contentEl.createDiv("tag-lock-modal-actions");
		const cancel = actions.createEl("button", { text: this.plugin.t("cancel") });
		const confirm = actions.createEl("button", { text: this.plugin.t("resetAllCredentials"), cls: "mod-warning" });
		cancel.addEventListener("click", () => this.close());
		confirm.addEventListener("click", () => {
			this.close();
			this.onConfirm();
		});
	}

	onClose(): void {
		this.contentEl.empty();
	}
}

class PrivacyGuardSettingTab extends PluginSettingTab {
	private readonly plugin: PrivacyGuardPlugin;

	constructor(app: App, plugin: PrivacyGuardPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		this.render();
	}

	private render(): void {
		const { containerEl } = this;
		containerEl.empty();
		if (this.plugin.settings.protectionEnabled && this.plugin.settings.protectSettings && this.plugin.hasCredential() && !this.plugin.isUnlocked()) {
			this.renderLockedSettings(containerEl);
			return;
		}
		new Setting(containerEl).setName(this.plugin.t("tagLock")).setHeading();

		this.addHeading(containerEl, "categoryPreferences");
		this.addToggle(containerEl, this.plugin.t("protectionEnabledName"), this.plugin.t("protectionEnabledDesc"), "protectionEnabled");
		new Setting(containerEl)
			.setName(this.plugin.t("languageName"))
			.setDesc(this.plugin.t("languageDesc"))
			.addDropdown((dropdown) => dropdown
				.addOption("auto", this.plugin.t("languageAuto"))
				.addOption("zh", this.plugin.t("languageChinese"))
				.addOption("en", this.plugin.t("languageEnglish"))
				.setValue(this.plugin.settings.language)
				.onChange(async (value) => {
					this.plugin.settings.language = value as LanguageMode;
					await this.plugin.saveSettings();
					this.render();
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
		new Setting(containerEl)
			.setName(this.plugin.t("authMethodName"))
			.setDesc(this.plugin.t("authMethodDesc"))
			.addDropdown((dropdown) => dropdown
				.addOption("password", this.plugin.t("authPassword"))
				.addOption("pattern", this.plugin.t("authPattern"))
				.setValue(this.plugin.settings.authMethod)
				.onChange(async (value) => {
					this.plugin.settings.authMethod = value as AuthMethod;
					await this.plugin.saveSettings();
					this.render();
				}));
		new Setting(containerEl)
			.setName(this.plugin.hasCredential() ? this.plugin.t("changeCredential") : this.plugin.t("setupCredential"))
			.setDesc(this.plugin.t("credentialSettingDesc"))
			.addButton((button) => button
				.setButtonText(this.plugin.hasCredential() ? this.plugin.t("changeCredential") : this.plugin.t("setupCredential"))
				.setCta()
				.onClick(() => new CredentialSetupModal(this.app, this.plugin).open()))
			.addButton((button) => button
				.setButtonText(this.plugin.t("resetAllCredentials"))
				.setDestructive()
				.onClick(() => new ResetCredentialsConfirmModal(this.app, this.plugin, () => {
					void this.plugin.resetAllCredentials().then(() => {
						new Notice(this.plugin.t("resetAllCredentialsDone"));
						this.render();
					});
				}).open()));
		new Setting(containerEl)
			.setName(this.plugin.t("passwordHintName"))
			.setDesc(this.plugin.t("passwordHintDesc"))
			.addText((text) => text
				.setValue(this.plugin.settings.passwordHint)
				.onChange(async (value) => {
					this.plugin.settings.passwordHint = value.trim();
					await this.plugin.saveSettings();
				}));
		this.addToggle(containerEl, this.plugin.t("unlockOnCorrectCredentialName"), this.plugin.t("unlockOnCorrectCredentialDesc"), "unlockOnCorrectCredential");
		new Setting(containerEl)
			.setName(this.plugin.t("failureActionName"))
			.setDesc(this.plugin.t("failureActionDesc"))
			.addDropdown((dropdown) => dropdown
				.addOption("previous", this.plugin.t("failurePrevious"))
				.addOption("close", this.plugin.t("failureClose"))
				.addOption("none", this.plugin.t("failureNone"))
				.setValue(this.plugin.settings.failureAction)
				.onChange(async (value) => {
					this.plugin.settings.failureAction = value as FailureAction;
					await this.plugin.saveSettings();
				}));

		this.addHeading(containerEl, "categoryLockRules");
		new Setting(containerEl)
			.setName(this.plugin.t("unlockDurationName"))
			.setDesc(this.plugin.t("unlockDurationDesc"))
			.addText((text) => text
				.setValue(String(this.plugin.settings.unlockMinutes))
				.setPlaceholder("30")
				.onChange(async (value) => {
					const parsed = Number(value.trim());
					if (!Number.isFinite(parsed) || parsed < 0) return;
					this.plugin.settings.unlockMinutes = Math.floor(parsed);
					await this.plugin.saveSettings();
				}));
		this.addToggle(containerEl, this.plugin.t("lockRestartName"), this.plugin.t("lockRestartDesc"), "lockOnRestart");
		this.addToggle(containerEl, this.plugin.t("lockBackgroundName"), this.plugin.t("lockBackgroundDesc"), "lockOnBackground");
		this.addToggle(containerEl, this.plugin.t("forcePasswordEveryAccessName"), this.plugin.t("forcePasswordEveryAccessDesc"), "forcePasswordEveryAccess");
	}

	private renderLockedSettings(container: HTMLElement): void {
		new Setting(container).setName(this.plugin.t("settingsLocked")).setHeading();
		container.createEl("p", { text: this.plugin.t("settingsReason") });
		new Setting(container)
			.addButton((button) => button
				.setButtonText(this.plugin.t("unlockButton"))
				.setCta()
				.onClick(async () => {
					if (await this.plugin.requestUnlock(this.plugin.t("settingsReason"), false)) this.render();
				}));
	}

	private addHeading(container: HTMLElement, key: string): void {
		new Setting(container).setName(this.plugin.t(key)).setHeading();
	}

	private addTextArea(container: HTMLElement, nameKey: string, descKey: string, key: "protectedTags" | "protectedFolders"): void {
		new Setting(container)
			.setName(this.plugin.t(nameKey))
			.setDesc(this.plugin.t(descKey))
			.addTextArea((text) => text
				.setValue(this.plugin.settings[key].join("\n"))
				.onChange(async (value: string) => {
					this.plugin.settings[key] = value.split(/\r?\n/);
					await this.plugin.saveSettings();
				}).inputEl.addClass("privacy-guard-setting-list"));
	}

	private addToggle(
		container: HTMLElement,
		name: string,
		description: string,
		key: "protectionEnabled" | "persistUnlockAcrossRestart" | "lockOnRestart" | "lockOnBackground" | "protectPageOpen" | "protectSearch" | "protectPreview" | "protectTagNamedPages" | "protectTagNamedLinks" | "protectSettings" | "forcePasswordEveryAccess" | "unlockOnCorrectCredential"
	): void {
		new Setting(container)
			.setName(name)
			.setDesc(description)
			.addToggle((toggle) => toggle
				.setValue(this.plugin.settings[key])
				.onChange(async (value) => {
					this.plugin.settings[key] = value;
					await this.plugin.saveSettings();
				}));
	}
}
