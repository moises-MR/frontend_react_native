import React from 'react'
import { StatusBar,SafeAreaView } from 'react-native'

export default function StatusBarCustom(props) {

    const {backgroundColor,...reset} = props;

    return (
        <>
        <StatusBar backgroundColor={backgroundColor} {...reset} />
        <SafeAreaView
        style={{
            flex: 0,
            backgroundColor,
        }}
        />
        </>
    )
}
