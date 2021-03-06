import React from 'react';
import {Button, Spinner, withStyles} from "@ui-kitten/components";
import {View} from "react-native";
import {SeSeparator} from "../../../../Shared/Separator";

const buttonSize = (size, buttonWidth) => {
  let buttonStyle = {}
  if (size === 'md') buttonStyle.paddingVertical = 18
  if (size === 'sm') buttonStyle.paddingVertical = 8
  if (size === 'xs') buttonStyle.paddingVertical = 4
  if (buttonWidth) {
    buttonStyle.width = buttonWidth
  }
  return buttonStyle
}

export const FooterButtonsComponent = (
  {
    eva,
    rightAction,
    leftAction,
    style,
    loading,
    size = 'md',
    buttonWidth,
    gap,
    buttonSize,
    confirmButtonText,
    leftButtonText,
    submitButton = true,
    loadingLeftAction
  }) => {
  const styles = eva?.style
  return <View style={style}>
    {
      leftAction &&
      <>
        <Button
          size={buttonSize || 'small'}
          disabled={loadingLeftAction || loading}
          status='basic'
          onPress={leftAction}
          style={{...styles?.button(size, buttonWidth), ...styles?.goBackButton}}
        >
          {
            loadingLeftAction ?
              <Spinner/> :
              leftButtonText || 'Volver'
          }
        </Button>
        {gap && <SeSeparator d='H' value={gap}/>}
      </>
    }
    {gap && <SeSeparator d='H' value={gap}/>}
    {
      submitButton && <Button
        size={buttonSize || 'small'}
        disabled={loading}
        onPress={rightAction}
        style={{...styles?.button(size), ...styles?.nextButton}}
      >
        {
          loading ?
            <Spinner/> :
            confirmButtonText || "Siguiente"
        }
      </Button>
    }
  </View>
};

export const FooterButtons = withStyles(FooterButtonsComponent, (theme) => ({
  button: buttonSize,
  goBackButton: {
    flex: 1,
    backgroundColor: theme['color-basic-500'],
    borderColor: theme['color-basic-500'],
  },
  nextButton: {
    flex: 1,
  },
}));