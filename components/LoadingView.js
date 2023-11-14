import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../constans/colors';

export default class LoadingView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color={Colors.headerCol}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    }
});