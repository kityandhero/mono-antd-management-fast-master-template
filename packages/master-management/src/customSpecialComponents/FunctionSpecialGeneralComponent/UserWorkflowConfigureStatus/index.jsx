import {
  isInvalid,
  isNull,
  isUndefined,
  refitCommonData,
  searchFromList,
} from 'easy-soft-utility';

import {
  unknownLabel,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import {
  buildDropdownMenu,
  buildFlexRadio,
  buildFlexSelect,
  buildFormRadio,
  buildFormSelect,
  buildOptionItem,
  buildRadioItem,
  buildSearchFormSelect,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';
import { getMergeMetaData } from 'antd-management-fast-framework';

export function refitUserWorkflowConfigureStatusList({ withUnlimited = true }) {
  const { userWorkflowConfigureStatusList: list } = {
    userWorkflowConfigureStatusList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getUserWorkflowConfigureStatusName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitUserWorkflowConfigureStatusList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderUserWorkflowConfigureStatusOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitUserWorkflowConfigureStatusList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderUserWorkflowConfigureStatusRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitUserWorkflowConfigureStatusList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchUserWorkflowConfigureStatusSelect({
  withUnlimited = true,
  label = '状态',
  name = 'status',
  helper = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitUserWorkflowConfigureStatusList({
    withUnlimited,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}

export function renderCustomUserWorkflowConfigureStatusSelect({
  style = {},
  label = '状态',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitUserWorkflowConfigureStatusList({
    withUnlimited: true,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFlexSelect({
    style,
    label,
    defaultValue: null,
    separator,
    size,
    list: list,
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderUserWorkflowConfigureStatusDropDown({
  label = '状态',
  placement = 'bottomRight',
  icon = null,
  size = 'middle',
  onClick: onClickCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitUserWorkflowConfigureStatusList({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildDropdownMenu({
    label,
    placement,
    icon,
    size,
    list: list,
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormUserWorkflowConfigureStatusSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  const title = label || unknownLabel;

  const listData = refitUserWorkflowConfigureStatusList({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}

export function renderCustomUserWorkflowConfigureStatusRadio({
  label = '状态',
  separator = ': ',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitUserWorkflowConfigureStatusList({
    withUnlimited: true,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFlexRadio({
    label,
    defaultValue: null,
    separator,
    size,
    list: list,
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormUserWorkflowConfigureStatusRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitUserWorkflowConfigureStatusList({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}
