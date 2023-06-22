import {Animated, Dimensions, FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {COLOURS, Items} from "../database/database";
import {useEffect, useState} from "react";
import Entypo from "react-native-vector-icons/Entypo";

export const ProductInfor = ({route,navigation}) => {
	const {productID} = route.params;
	const [product, setProduct] = useState({});

	const width = Dimensions.get('window').width;

	const scrollX = new Animated.Value(0)



	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataByIDFromDB()
		})
		return unsubscribe
	}, [navigation]);


	const getDataByIDFromDB = () => {
		for (let i = 0; i < Items.length; i++) {
			if (Items[i].id === productID) {
				setProduct(Items[i]);
				return;
			}
		}

	}

	const renderProduct = ({item,index}) => {
		return (
			<View style={{width: width, height: 240, alignItems: 'center', justifyContent: 'center'}}>
				<Image source={item} style={{width: '100%', height: '100%', resizeMode: 'contain'}} />
			</View>
		)
	}


	return (
		<View style={{
			width: '100%',
			height: '100%',
			backgroundColor: COLOURS.white,
			position:'relative'
		}}>
			<StatusBar backgroundColor={COLOURS.backgroundLight} barStyle='dark-content' />

			<ScrollView>
				<View style={{
					width: '100%',
					backgroundColor: COLOURS.backgroundLight,
					borderBottomRightRadius: 20,
					borderBottomLeftRadius: 20,
					position: 'relative',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 4,
				}}>
					<View style={{
						width: '100%',
						backgroundColor: COLOURS.backgroundLight,
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingTop: 16,
						paddingLeft: 16
					}} >
						<TouchableOpacity>
							<Entypo name='chevron-left' style={{fontSize: 18, borderRadius: 10, color: COLOURS.backgroundDark, padding: 12, backgroundDark: COLOURS.white}} />
						</TouchableOpacity>
					</View>

					<FlatList
						data={product.productImageList ? product.productImageList : null}
						showsHorizontalScrollIndicator={false}
						decelerationRate={0.8}
						snapToInterval={width}
						bounces={false}
						horizontal renderItem={renderProduct}
						keyExtractor={(item) => item.id}
						// onScroll={Animated.event([{nativeEvent: {contentOffset: {x:scrollX}}}],
						// 	{useNativeDriver: false}
						// 	)}
					/>
				</View>
			</ScrollView>
		</View>
	)
}