import { Image, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FlashList } from '@shopify/flash-list';
import LoadSearch from '@/components/LoadSearch';
import AxiosInstance from '@/helpers/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const SEARCH_HISTORY_KEY = "search_history";

const Searcch = () => {
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [showResults, setShowResults] = useState(false); // Ẩn danh sách sản phẩm ban đầu

    useEffect(() => {
        loadSearchHistory();
    }, []);

    const loadSearchHistory = async () => {
        try {
            const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
            if (history) {
                setSearchHistory(JSON.parse(history));
            }
        } catch (error) {
            console.error("Lỗi khi load lịch sử tìm kiếm:", error);
        }
    };

    const saveSearchHistory = async (query) => {
        if (!query.trim()) return;
        let updatedHistory = [query, ...searchHistory.filter((item) => item !== query)];

        if (updatedHistory.length > 10) {
            updatedHistory = updatedHistory.slice(0, 10);
        }

        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setShowResults(true); // Khi nhấn tìm kiếm, hiển thị danh sách sản phẩm

        try {
            const res = await AxiosInstance().get(`/prod/search?query=${searchTerm}`);
            setResults(res.products);
            saveSearchHistory(searchTerm); // Lưu vào lịch sử sau khi tìm kiếm
        } catch (error) {
            console.log("Lỗi khi tìm kiếm:", error);
        }
    };

    const clearHistoryItem = async (query) => {
        const updatedHistory = searchHistory.filter(item => item !== query);
        setSearchHistory(updatedHistory);
        await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    };

    useEffect(() => {
        if (searchTerm === "") {
            setShowResults(false);
        }
    }, [searchTerm]);
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Header
                iconLeft={require('../assets/icons/chevron-left.png')}
                title="TÌM KIẾM"
            />
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder='Tìm kiếm'
                    placeholderTextColor={'#7D7B7B'}
                    value={searchTerm}
                    onChangeText={(text) => {
                        setSearchTerm(text);
                        if (text === "") {
                            setShowResults(false); // Khi xóa hết chữ, hiển thị lịch sử tìm kiếm
                        }
                    }}
                    style={styles.search}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.icon}>
                    <Image source={require('@/assets/icons/search.png')} />
                </TouchableOpacity>
            </View>

            {/* Hiển thị lịch sử tìm kiếm */}
            {!showResults && searchHistory.length > 0 && (
                <View style={styles.historyContainer}>
                    <Text style={styles.historyTitle}>Tìm kiếm gần đây</Text>
                    <FlatList
                        data={searchHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.historyItem}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSearchTerm(item);
                                        handleSearch(true);
                                    }}
                                    style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
                                >
                                    <Image source={require('@/assets/icons/clock.png')} style={styles.closeIcon} />
                                    <Text style={styles.historyText}>{item}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => clearHistoryItem(item)}>
                                    <Image source={require('@/assets/icons/quit.png')} style={styles.closeIcon} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}

            {/* Hiển thị danh sách sản phẩm sau khi nhấn nút tìm kiếm */}
            {showResults && (
                <View style={{ marginHorizontal: 48 }}>
                    <FlashList
                        data={results}
                        renderItem={({ item }) => (
                            <LoadSearch
                                name={item.name}
                                img={item.image}
                                quantity={item.quantity}
                                price={item.price}
                                onPress = {() => navigation.navigate('Detail', { _id: item._id })}
                            />
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export default Searcch;

const styles = StyleSheet.create({
    search: {
        height: 33,
        borderBottomWidth: 1.5,
        fontSize: 18,
    },
    searchContainer: {
        marginHorizontal: 48,
        marginBottom: 20,
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 0
    },
    historyContainer: {
        marginHorizontal: 48,
        marginBottom: 20
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5
    },
    historyText: {
        fontSize: 16
    },
    closeIcon: {
        width: 20,
        height: 20
    }
});