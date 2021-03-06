import React from 'react';
import {Icon, withStyles} from "@ui-kitten/components";
import {Pressable, View} from "react-native";
import {PlusCircle} from "../icons";

const FloatingActionButtonComponent = ({eva, onPress, icon}) => {
  const {style: styles, theme} = eva
  return <View style={styles?.absoluteContainer}>
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <View style={styles?.iconContainer(theme['color-basic-900'])}>
          <Icon
            fill={pressed ? theme['color-primary-400'] : theme['color-primary-500']}
            style={styles?.icon}
            name={icon || "plus-circle"}
          />
        </View>
      )}
    </Pressable>
  </View>
};

export const FloatingActionButton = withStyles(FloatingActionButtonComponent, (theme) => ({
  absoluteContainer: {
    position: 'absolute',
    bottom: 50,
    right: 40
  },
  iconContainer: (bg) => ({
    backgroundColor: bg,
    width: 45,
    height: 45,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  icon: {
    width: 90,
    height: 90,
  },
}));