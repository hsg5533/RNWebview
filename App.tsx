/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  Alert,
  BackHandler,
  Keyboard,
  NativeModules,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const webviewRef = useRef<WebView>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [canGoBack, setCanGoBack] = useState(false);
  const {KeyboardMode} = NativeModules;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data || '{}');

      if (data.type === 'LIVE_PRODUCT_CLICK') {
        const {href, itemId, pip} = data;
        Alert.alert(href);
        // 1) 여기서 네이티브 PiP 플레이어 시작 (react-native-video + PiP 등)
        if (pip) {
          // startPiPPlayer(liveStreamUrl);
        }

        // 2) 그리고 상품 상세로 이동 (WebView URL 바꾸거나, 네이티브 화면으로 이동)
        // navigation.navigate('ProductDetail', { href, itemId });

        console.log('LIVE_PRODUCT_CLICK', data);
      }
    } catch (e) {
      console.warn('invalid message from webview', e);
    }
  }, []);

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     KeyboardMode?.setAdjustNothing();
  //   }
  //   return () => {
  //     if (Platform.OS === 'android') {
  //       KeyboardMode?.setAdjustResize(); // 원래 정책으로
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (canGoBack && webviewRef.current) {
          webviewRef.current.goBack();
          return true;
        } else {
          Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
            {
              text: '취소',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: '확인', onPress: BackHandler.exitApp},
          ]);
        }
        return true;
      },
    );
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={{flex: 1, ...backgroundStyle}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <WebView
        ref={webviewRef}
        source={{uri: 'https://host.semicolons.link/livestation/'}}
        userAgent={
          'Mozilla/5.0 (Linux; Android 10; SM-G973N Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36'
        }
        cacheEnabled={false}
        onMessage={handleMessage}
        setSupportMultipleWindows={false}
        onNavigationStateChange={({canGoBack}) => setCanGoBack(canGoBack)}
        // 아래 옵션들이 키보드 관련 체감 안정성에 도움되는 경우가 많음
        keyboardDisplayRequiresUserAction={false}
        automaticallyAdjustContentInsets={false}
      />
    </SafeAreaView>
  );
}

export default App;
