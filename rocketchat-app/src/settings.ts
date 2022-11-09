import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';

export enum AppSetting {
    AppSecret = 'recognize_app_secret',
    EnabledIdentificationServices = 'enabled_identification_services',
    ItsmeClientId = 'itsme_client_id',
    ItsmeClientSecret = 'itsme_client_secret',
    PexipBaseUrl = 'pexip_base_url',
    PexipUsername = 'pexip_username',
    PexipPassword = 'pexip_password',
}

export const settings: Array<ISetting> = [
    // Options
    {
        id: AppSetting.EnabledIdentificationServices,
        type: SettingType.MULTI_SELECT,
        section: 'General',
        packageValue: [],
        required: true,
        public: true,
        values: [
            { key: 'itsme', i18nLabel: `${AppSetting.EnabledIdentificationServices}_itsme` },
            { key: 'pexip', i18nLabel: `${AppSetting.EnabledIdentificationServices}_pexip` },
        ],
        i18nLabel: AppSetting.EnabledIdentificationServices,
        i18nDescription: `${AppSetting.EnabledIdentificationServices}_description`,
    },

    // App secret used to generate a token
    {
        id: AppSetting.AppSecret,
        type: SettingType.STRING,
        section: 'General',
        packageValue: '',
        required: true,
        public: false,
        i18nLabel: AppSetting.AppSecret,
        i18nDescription: `${AppSetting.AppSecret}_description`,
    },

    // Itsme
    {
        id: AppSetting.ItsmeClientId,
        type: SettingType.STRING,
        section: 'Itsme',
        packageValue: '',
        required: false,
        public: false,
        i18nLabel: AppSetting.ItsmeClientId,
        i18nDescription: `${AppSetting.ItsmeClientId}_description`,
    },
    {
        id: AppSetting.ItsmeClientSecret,
        type: SettingType.STRING,
        section: 'Itsme',
        packageValue: '',
        required: false,
        public: false,
        i18nLabel: AppSetting.ItsmeClientSecret,
        i18nDescription: `${AppSetting.ItsmeClientSecret}_description`,
    },

    // Pexip
    {
        id: AppSetting.PexipBaseUrl,
        type: SettingType.STRING,
        section: 'Pexip',
        packageValue: '',
        required: false,
        public: false,
        i18nLabel: AppSetting.PexipBaseUrl,
        i18nDescription: `${AppSetting.PexipBaseUrl}_description`,
    },
    {
        id: AppSetting.PexipUsername,
        type: SettingType.STRING,
        section: 'Pexip',
        packageValue: '',
        required: false,
        public: false,
        i18nLabel: AppSetting.PexipUsername,
        i18nDescription: `${AppSetting.PexipUsername}_description`,
    },
    {
        id: AppSetting.PexipPassword,
        type: SettingType.STRING,
        section: 'Pexip',
        packageValue: '',
        required: false,
        public: false,
        i18nLabel: AppSetting.PexipPassword,
        i18nDescription: `${AppSetting.PexipPassword}_description`,
    },
];
