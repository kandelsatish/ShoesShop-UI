import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, } from 'react-native'
import images from '../../constants/images'
import { Svg, Polygon } from 'react-native-svg'
import { BlurView } from 'expo-blur'
export default function HomeScreen() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [modelVisible, setModelVisible] = useState(false);
    const [selectedShoesSize, setSelectedShoesSize] = useState(null);

    const dommyData = [
        { id: 1, price: '$150', name: 'Nike metcon', type: 'Running', image: images.nikeMatcon3, background: '#b5762a' },
        { id: 2, price: '$100', name: 'Nike Matcon ', type: 'Foot Ball boot', image: images.nikeMatcon4, background: '#304a91' },
        { id: 3, price: '$200', name: 'Nike Matcon Black', type: 'Foot Ball', image: images.nikeMatcon5Purple, background: 'purple' },
        { id: 4, price: '$500', name: 'Nike Matcon Zoom Kobe', type: 'Man\'s basket ball', image: images.nikeZoomKobe1Protro, background: '#762c91' },
    ]

    // Avaliable shoes size
    const sizes = [34, 35, 36, 37, 38, 39];

    // function to view items which are on trending
    const renderTreandingItems = ({ item }) => (
        <TouchableOpacity onPress={() => {
            setModelVisible(true);
            setSelectedItem(item);
        }}>
            <Text style={{ marginLeft: 10, color: 'grey', fontSize: 15, marginBottom: 10 }}>{item.type}</Text>
            <View style={[styles.trending, { backgroundColor: item.background }, styles.trendingShadow]}>
                <View style={{ margin: 5 }}>
                    <Text style={{ fontSize: 18, marginTop: 10 }}>{item.name}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.price}</Text>
                </View>
                <Image
                    resizeMode={'contain'}
                    source={item.image}
                    style={{
                        position: 'absolute',
                        top: 40,
                        right: 0,
                        width: '100%',
                        height: 80,
                        transform: [{ rotate: '-20deg' }]
                    }}
                />
                <View style={{ position: "absolute", top: 0, right: 0, width: '95%', height: '100%' }}>
                    <Svg>
                        <Polygon
                            points="0,0 160,105 220,150"
                            fill="#ffff"
                        />
                    </Svg>
                </View>
            </View>
        </TouchableOpacity >
    )
    // function to view recently viewed items
    const renderReceltlyViewdItems = ({ item }) => (
        <TouchableOpacity style={{ marginVertical: 5, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => {
                setModelVisible(true);
                setSelectedItem(item)
            }}>
            <View>
                <Image source={item.image}
                    resizeMode="contain"
                    style={{ height: 60, width: 130 }} />
            </View>
            <View>
                <Text style={{ color: 'grey', fontSize: 15 }}>{item.name}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    )

    //function to show size of the showe avaliable
    const renderShoesSize = () => {
        return (
            sizes.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            height: 30,
                            width: 30,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: '#fff',
                            margin: 3,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => setSelectedShoesSize(item)}>
                        <Text style={{ color: '#fff' }}>{item}</Text>
                    </TouchableOpacity>
                )
            })
        )
    }
    // main return
    return (
        <View style={styles.container}>
            <Text style={styles.text}>TRENDING</Text>
            {/* trending */}
            <View style={styles.trendingList}>
                <FlatList
                    data={dommyData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderTreandingItems}
                />
            </View>
            {/* Recently Viewed */}
            <View style={[{ backgroundColor: '#ffff', flex: 1, width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: 'row' }, styles.recentViewContainer]}>
                {/* recently viewed label */}
                <View style={{ width: 70, height: '100%' }}>
                    <Image
                        source={images.recentlyViewedLabel}
                        style={{ height: '100%', width: '100%' }}
                    />
                </View>
                {/* list of recently viewed items */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={dommyData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderReceltlyViewdItems}
                    />
                </View>
            </View>
            
            {/* model */}
            {selectedItem
                ? <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modelVisible}
                >
                    <BlurView
                        intensity="100"
                        style={{ flex: 1 }}>
                        {/* this is button to close model */}
                        <TouchableOpacity style={styles.absolute}
                            onPress={() => {
                                setSelectedItem(null);
                                setModelVisible(false);
                                setSelectedShoesSize(null);
                            }}>
                            {/* this is containt inside the model */}
                            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', }}>
                                <View style={{ backgroundColor: selectedItem.background, borderRadius: 10 }}>
                                    <Image
                                        source={selectedItem.image}
                                        resizeMode="contain"
                                        style={{ height: 200, width: 300, transform: [{ rotate: '-20deg' }] }}
                                    />
                                    <Text style={{ fontSize: 20, marginLeft: 10, color: '#ffff' }}>{selectedItem.name}</Text>
                                    <Text style={{ fontSize: 15, marginLeft: 10, color: '#ffff' }}>{selectedItem.type}</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10, color: '#ffff' }}>{selectedItem.price}</Text>
                                    {/* this is to show the size of shoes avaliable */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Text style={{ fontSize: 20, marginLeft: 10, color: '#ffff', marginBottom: 10 }}>Select Size</Text>
                                        </View>
                                        <View style={{
                                            // flex: 1,
                                            marginLeft: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                            {renderShoesSize()}
                                        </View>
                                    </View>
                                    {/* Button to add to the cart */}
                                    <TouchableOpacity
                                        style={{ marginTop: 10, height: 60, backgroundColor: '#5c527d', justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            setSelectedShoesSize(null);
                                            setModelVisible(false);
                                            setSelectedItem(null)
                                        }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add To Cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </BlurView>
                </Modal>
                : null
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10
    },
    trendingList: {
        height: 250,
        marginTop: 10,
    },
    trending: {
        marginHorizontal: 10,
        height: 200,
        width: 160,
        borderRadius: 10,
        justifyContent: 'flex-end'
    },
    trendingShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 5
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    recentViewContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 5
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    absolute: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
});
