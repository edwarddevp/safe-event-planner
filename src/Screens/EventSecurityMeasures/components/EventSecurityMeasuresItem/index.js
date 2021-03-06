import React, {useEffect, useState} from 'react';
import {Pressable, View} from "react-native";
import {Layout, withStyles, Text, Radio} from "@ui-kitten/components";
import {CheckmarkCircleOutline} from "../../../../Shared/icons";
import {useDisclosure} from "../../../../hooks/useDisclosure";
import {EventSecurityMeasuresItemModal} from "../EventSecurityMeasuresModal";

const EventSecurityMeasuresItemComponent = ({item, eva, eventSecurityMeasures = [], setSecuritiesActive}) => {
  const {style: styles, theme} = eva;
  const [isActive, setIsActive] = useState(eventSecurityMeasures.includes(eventSecurityMeasure => eventSecurityMeasure.id === item.id))

  useEffect(() => {
    if (eventSecurityMeasures && eventSecurityMeasures.length) {
      setIsActive(eventSecurityMeasures.includes(item.id))
    }
  }, [eventSecurityMeasures])

  const {isOpen, onOpen, onClose} = useDisclosure()

  const toggleEventSecurityMeasure = async () => {
    if (isActive) {
      setSecuritiesActive(measures => measures.filter(measure => measure !== item.id))
      setIsActive(false)
    } else {
      setSecuritiesActive(measures => [...measures, item.id])
      setIsActive(true)
    }
  }

  return <Layout style={styles?.item}>
    <View style={styles?.leftSide}>
      <Pressable onPress={isActive ? toggleEventSecurityMeasure : null}>
        {({pressed}) => (
          <Layout level={pressed ? "2" : "1"} style={styles?.leftSideContentCompleteIcon}>
            <View style={styles?.rightBorder}>
              {
                isActive ?
                  <View style={styles?.checkIcon}>
                    <CheckmarkCircleOutline
                      fill={theme['color-success-600']}
                      style={styles?.deleteIcon}
                    />
                  </View> :
                  <Radio
                    style={styles?.setCompleteRadio}
                    onChange={toggleEventSecurityMeasure}
                  />
              }
            </View>
          </Layout>
        )}
      </Pressable>
      <Pressable onPress={onOpen} style={{flex: 1}}>
        {({pressed}) => (
          <Layout level={pressed ? "2" : "1"} style={styles?.leftSideContentInfo}>
            <Text style={styles?.textName}>{item?.name}</Text>
          </Layout>
        )}
      </Pressable>
    </View>
    <EventSecurityMeasuresItemModal
      isOpen={isOpen}
      onClose={onClose}
      securityMeasure={item}
    />

  </Layout>
}

export const EventSecurityMeasuresItem = withStyles(EventSecurityMeasuresItemComponent, (theme) => ({
  item: {
    flexDirection: 'row',
    minHeight: 70,
    borderRadius: 8,
    marginHorizontal: 24,
    marginVertical: 6,
    overflow: 'hidden',
    shadowColor: theme["color-basic-transparent-500"],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftSide: {
    flex: 5,
    flexDirection: 'row',
  },
  rightSide: {
    flex: 1,
  },
  leftSideContentCompleteIcon: {
    flex: 1,
    paddingVertical: 8,
  },
  setCompleteRadio: {
    paddingHorizontal: 18
  },
  checkIcon: {
    paddingHorizontal: 10
  },
  leftSideContentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  rightSideContent: {
    flex: 1,
    paddingVertical: 8
  },
  leftBorder: {
    flex: 1,
    borderLeftWidth: 2,
    borderColor: theme['color-basic-900'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBorder: {
    flex: 1,
    borderRightWidth: 2,
    borderColor: theme['color-basic-900'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: 48,
    height: 48,
  },
  deleteIcon: {
    width: 36,
    height: 36,
  },
  textName: {
    fontSize: 16
  }
}));

