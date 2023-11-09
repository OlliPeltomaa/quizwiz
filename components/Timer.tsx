import { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Easing} from "react-native";

export default function Timer(props: any) {
    return (
        <View style={styles.outer}>
            <Animated.View style={[styles.inner, { width: props.time }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    outer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        height: 20,
        width: 200,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 5,
        marginBottom: 10
    },

    inner: {
        backgroundColor: '#CF9FFF',
        borderRadius: 20,
        height: 10,
        width: 190,
    },
});