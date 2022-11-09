import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';

export enum AppSetting {
    EnabledIdentificationServices = 'enabled_identification_services',
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
];
