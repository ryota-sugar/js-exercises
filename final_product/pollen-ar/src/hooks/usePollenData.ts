import { useEffect, useState } from 'react';
import type { ApiData, ErrorType, PollenTypeInfo } from '../types/Type';

export default function usePollenData() {
  const [apiData, setApiData] = useState<ApiData>({
    speed: 0,
    direction: 0,
    sugiLevel: 0,
    hinokiLevel: 0,
    status: '待機中',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    type: ErrorType;
    message: string;
  } | null>(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        type: 'location',
        message: 'お使いの端末・ブラウザは位置情報に対応していません。',
      });
      setIsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = import.meta.env.VITE_GOOGLE_POLLEN_API_KEY;
          // Promise.allで天気情報(風速と風向き)と花粉情報のAPIを同時に呼び出す
          const [weatherRes, pollenRes] = await Promise.all([
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
            ),
            fetch(
              `https://pollen.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.latitude=${latitude}&location.longitude=${longitude}&days=1`,
            ),
          ]);

          if (!weatherRes.ok || !pollenRes.ok) {
            throw new Error('APIの取得に失敗しました');
          }

          const weatherData = await weatherRes.json();
          const pollenData = await pollenRes.json();

          const speed = weatherData.current_weather.windspeed;
          const direction = weatherData.current_weather.winddirection;

          let sugiLevel = 0;
          let hinokiLevel = 0;

          if (pollenData.dailyInfo && pollenData.dailyInfo.length > 0) {
            const plants: PollenTypeInfo[] =
              pollenData.dailyInfo[0].plantInfo || [];
            const cedar = plants.find((p: PollenTypeInfo) =>
              p.code.includes('CEDAR'),
            );
            const cypress = plants.find((p: PollenTypeInfo) =>
              p.code.includes('CYPRESS'),
            );

            if (cedar) sugiLevel = cedar.indexInfo?.value || 0;
            if (cypress) hinokiLevel = cypress.indexInfo?.value || 0;

            if (sugiLevel === 0 && hinokiLevel === 0) {
              const types: PollenTypeInfo[] =
                pollenData.dailyInfo[0].pollenTypeInfo || [];
              const tree = types.find((t: PollenTypeInfo) => t.code === 'TREE');
              if (tree) {
                sugiLevel = tree.indexInfo?.value || 0;
                hinokiLevel = Math.max(0, sugiLevel - 1);
              }
            }
          }

          setApiData({
            speed,
            direction,
            sugiLevel,
            hinokiLevel,
            status: `実際のデータ | スギ:Lv${sugiLevel} ヒノキ:Lv${hinokiLevel}`,
          });

          setIsLoading(false);
        } catch (error) {
          setError({
            type: 'api',
            message:
              error instanceof Error ? error.message : '不明な通信エラー',
          });
          setIsLoading(false);
          setApiData((prev) => ({
            ...prev,
            status: `データ取得失敗: ${error instanceof Error ? error.message : '不明な通信エラー'}`,
          }));
        }
      },
      (geoError) => {
        // 位置情報が拒否された/取得できなかった場合
        let errorMsg = '位置情報の取得に失敗しました。';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          errorMsg =
            '位置情報へのアクセスが拒否されました。設定を確認してください。';
        }
        setError({ type: 'location', message: errorMsg });
        setIsLoading(false);
      },
    );
  }, []);
  return { apiData, isLoading, error };
}
