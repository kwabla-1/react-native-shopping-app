import {Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {COLOURS, Items} from "../database/database";
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from "react";

export const Home = ({navigation}) => {
	const [products, setProducts] = useState([]);
	const [accessory, setAccessory] = useState([]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDataFromDb()
		})
		return unsubscribe
	}, [navigation]);


	const getDataFromDb = () => {
		let productList = []
		let accessoryList = []

		for (let i = 0; i < Items.length; i++) {
			if (Items[i].category === 'product') productList.push(Items[i])
			else if (Items[i].category === 'accessory') accessoryList.push(Items[i]);
		}

		setProducts(productList);
		setAccessory(accessoryList);

		console.log(products)
	}

	const ProductCard = ({data}) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('ProductInfor', {productID: data.id})} style={{width: '48%', marginVertical: 14}}>

				<View style={{
					position: 'relative',
					width: '100%',
					height: 100,
					borderRadius: 10,
					backgroundColor: COLOURS.backgroundLight,
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 8,
				}}>
					{data.isOff ?
						(<View style={{
							position: 'absolute',
							width: '20%',
							height: '24%',
							backgroundColor: 'green',
							top: 0,
							left: 0,
							borderTopLeftRadius: 10,
							borderBottomRightRadius: 10,
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<Text style={{color: 'white', fontSize: 12, fontWeight: 'bold', letterSpacing: 1}}>{data.offPercentage}</Text>
						</View>) :
						null}

					<Image source={data.productImage } style={{width: '80%', height: '80%', resizeMode: 'contain'}} />
				</View>

				<Text style={{fontSize: 12, fontWeight: '600', marginBottom: 2}}>{data.productName}</Text>

				{
					data.category == 'accessory' ? (data.isAvailable) ?
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<FontAwesome name='circle' style={{fontSize: 12, marginRight: 6, color: 'green'}} />
							<Text style={{fontSize: 12, color: 'green'}}>Available</Text>
						</View> : <View style={{flexDirection: 'row', alignItems: 'center'}}>
							<FontAwesome name='circle' style={{fontSize: 12, marginRight: 6, color: 'red'}} />
							<Text style={{fontSize: 12, color: 'red'}}>unavailable</Text>
						</View> : null
				}

				<Text>
					$ {data.productPrice}
				</Text>

			</TouchableOpacity>
		)
	}

	return (
		<View style={{width: '100%', height: '100%', backgroundColor: COLOURS.white}}>
			<StatusBar backgroundColor='white' barStyle="dark-content" />

			<ScrollView showsVerticalScrollIndicator={false}>

				<View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
					<TouchableOpacity>
						<Entypo name='shopping-bag' style={{fontSize: 18, color: COLOURS.backgroundMedium, padding: 17, borderRadius: 10,
						backgroundColor: COLOURS.backgroundLight}} />
					</TouchableOpacity>

					<TouchableOpacity>
						<MaterialCommunityIcons name='cart' style={{fontSize: 18, color: COLOURS.backgroundMedium, padding: 17, borderRadius: 10,
							borderWidth: 2, borderColor: COLOURS.backgroundLight}} />
					</TouchableOpacity>
				</View>

				<View style={{ marginBottom: 10,  padding: 16,}}>
					<Text style={{fontSize: 26, fontWeight: '400', letterSpacing: 1, marginBottom: 10}}>Hi-fi Shop &amp; Services </Text>
					<Text style={{fontSize: 14, fontWeight: '400', letterSpacing: 1, lineHeight: 24}}>Audio Shop on Dansoman Ave 78 {'\n'}This shop offers both products and services</Text>
				</View>

				<View style={{padding: 12}}>
					<View style={{padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text style={{fontSize: 18, color: COLOURS.black, fontWeight: '500', letterSpacing: 1}}>Products</Text>
							<Text style={{fontSize: 14, color: COLOURS.black, fontWeight: '400', opacity: 0.5, marginLeft: 10}}>24</Text>
						</View>

						<Text style={{color: COLOURS.blue, fontSize: 14, fontWeight: '400'}}>Sell All</Text>
					</View>

					<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
						{products.map((data) => <ProductCard data={data} key={data.id} />)}
					</View>

					{/*ACCESSORY*/}
					<View style={{padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text style={{fontSize: 18, color: COLOURS.black, fontWeight: '500', letterSpacing: 1}}>Accessory</Text>
							<Text style={{fontSize: 14, color: COLOURS.black, fontWeight: '400', opacity: 0.5, marginLeft: 10}}>24</Text>
						</View>

						<Text style={{color: COLOURS.blue, fontSize: 14, fontWeight: '400'}}>Sell All</Text>
					</View>

					<View style={{flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around'}}>
						{accessory.map((data) => <ProductCard data={data} key={data.id} />)}
					</View>
				</View>
			</ScrollView>
		</View>
	)
}