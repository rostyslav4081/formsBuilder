import {
  ControlElement,
  getAjv,
  getData,
  isVisible,
  JsonFormsState,
  OwnPropsOfRenderer
} from '@jsonforms/core';

export const controlWithoutLabel = (scope: string): ControlElement => ({
  type: 'Control',
  scope: scope,
  label: false,
});

export const mapStateToVisible = (
  state: JsonFormsState,
  ownProps: OwnPropsOfRenderer
) => {
  if (ownProps.uischema == null) {
    return { visible: false };
  }

  const visible =
    ownProps.visible !== undefined
      ? ownProps.visible
      : isVisible(
        ownProps.uischema,
        getData(state),
        '',
        getAjv(state)
      );

  return {
    visible,
  };
};


