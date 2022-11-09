import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';

export enum AppSetting {
    EnabledIdentificationServices = 'enabled_identification_services',
    ItsmeClientId = 'itsme_client_id',
    ItsmeClientSecret = 'itsme_client_secret',
}

export const settings: Array<ISetting> = [
    // Options
    {
        id: AppSetting.EnabledIdentificationServices,
        type: SettingType.MULTI_SELECT,
        packageValue: [],
        required: true,
        public: true,
        values: [
            { key: 'itsme', i18nLabel: `${AppSetting.EnabledIdentificationServices}_itsme` },
            { key: 'pexip', i18nLabel: `${AppSetting.EnabledIdentificationServices}_pexip` }
        ],
        i18nLabel: AppSetting.EnabledIdentificationServices,
        i18nDescription: `${AppSetting.EnabledIdentificationServices}_description`,
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
];
