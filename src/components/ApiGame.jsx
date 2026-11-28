import React, { useState, useEffect } from 'react';

function pickTwoDifferentCoins(coinList, fixedFirstCoin = null) {
    const first =
        fixedFirstCoin || coinList[Math.floor(Math.random() * coinList.length)];
    let second = coinList[Math.floor(Math.random() * coinList.length)];

    while (second.id === first.id && coinList.length > 1) {
        second = coinList[Math.floor(Math.random() * coinList.length)];
    }

    return { first, second };
}

function ApiGame() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchCount, setFetchCount] = useState(1);

    // Minigame state
    const [coinA, setCoinA] = useState(null);
    const [coinB, setCoinB] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const [lastGuessCorrect, setLastGuessCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    // Fetch live crypto market data on mount and when re-fetched
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false'
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        response.status === 429
                            ? 'Rate limit hit — wait a few seconds and retry.'
                            : 'Failed to fetch live market data.'
                    );
                }
                return response.json();
            })
            .then((data) => {
                setCoins(data);
                const { first, second } = pickTwoDifferentCoins(data);
                setCoinA(first);
                setCoinB(second);
                setRevealed(false);
                setLastGuessCorrect(null);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [fetchCount]);

    function handleGuess(direction) {
        if (revealed || !coinA || !coinB) return;

        const isHigher = coinB.market_cap >= coinA.market_cap;
        const isCorrect =
            (direction === 'higher' && isHigher) ||
            (direction === 'lower' && !isHigher);

        setRevealed(true);
        setLastGuessCorrect(isCorrect);

        if (isCorrect) {
            setScore((prev) => prev + 1);
            setStreak((prev) => prev + 1);
        } else {
            setStreak(0);
        }
    }

    function handleNextDuel() {
        const { first, second } = pickTwoDifferentCoins(coins, coinB);
        setCoinA(first);
        setCoinB(second);
        setRevealed(false);
        setLastGuessCorrect(null);
    }

    return (
        <div style={{ padding: '25px', maxWidth: '820px', margin: '0 auto', color: '#fff' }}>
            <h2>Crypto Market Cap // Higher or Lower</h2>
            <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
                Live cryptocurrency market data fetched via <code>useEffect</code> from CoinGecko.
            </p>

            {/* Telemetry Score Bar */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    background: '#0d1117',
                    border: '1px solid #06b6d4',
                    borderRadius: '8px',
                    padding: '12px 18px',
                    marginBottom: '22px'
                }}
            >
                <span><strong>Score:</strong> {score}</span>
                <span><strong>Streak:</strong> {streak} 🔥</span>
                <span><strong>Assets Tracked:</strong> Top {coins.length} by Market Cap</span>
            </div>

            {loading && <p style={{ color: '#06b6d4' }}>Syncing live market cap telemetry...</p>}

            {error && (
                <div style={{ color: '#ef4444', marginBottom: '15px' }}>
                    <p>Error: {error}</p>
                    <button
                        onClick={() => setFetchCount((prev) => prev + 1)}
                        style={{ padding: '8px 14px', cursor: 'pointer' }}
                    >
                        Retry Fetch
                    </button>
                </div>
            )}

            {/* Market Cap Duel Arena */}
            {!loading && !error && coinA && coinB && (
                <div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '20px',
                            marginBottom: '20px'
                        }}
                    >
                        {/* Known Coin (Coin A) */}
                        <div
                            style={{
                                background: '#0d1117',
                                border: '1px solid #333',
                                borderRadius: '10px',
                                padding: '22px',
                                textAlign: 'center'
                            }}
                        >
                            <img
                                src={coinA.image}
                                alt={coinA.name}
                                style={{ width: '56px', height: '56px', marginBottom: '10px' }}
                            />
                            <h3 style={{ margin: '5px 0' }}>
                                {coinA.name}{' '}
                                <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                                    ({coinA.symbol.toUpperCase()})
                                </span>
                            </h3>
                            <p style={{ color: '#9ca3af', margin: '6px 0' }}>
                                Price: <strong>${coinA.current_price.toLocaleString()}</strong>
                            </p>
                            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '14px' }}>
                                MARKET CAP (RANK #{coinA.market_cap_rank})
                            </p>
                            <p style={{ color: '#06b6d4', fontSize: '1.35rem', fontWeight: 'bold', margin: '4px 0' }}>
                                ${coinA.market_cap.toLocaleString()}
                            </p>
                        </div>

                        {/* Challenger Coin (Coin B) */}
                        <div
                            style={{
                                background: '#0d1117',
                                border: '1px solid #06b6d4',
                                borderRadius: '10px',
                                padding: '22px',
                                textAlign: 'center'
                            }}
                        >
                            <img
                                src={coinB.image}
                                alt={coinB.name}
                                style={{ width: '56px', height: '56px', marginBottom: '10px' }}
                            />
                            <h3 style={{ margin: '5px 0' }}>
                                {coinB.name}{' '}
                                <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                                    ({coinB.symbol.toUpperCase()})
                                </span>
                            </h3>
                            <p style={{ color: '#9ca3af', margin: '6px 0' }}>
                                Price: <strong>${coinB.current_price.toLocaleString()}</strong>
                            </p>

                            {!revealed ? (
                                <div style={{ marginTop: '14px' }}>
                                    <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                                        Is {coinB.name}&apos;s market cap <strong>Higher</strong> or{' '}
                                        <strong>Lower</strong> than {coinA.name}&apos;s?
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                        <button
                                            onClick={() => handleGuess('higher')}
                                            style={{
                                                padding: '10px 18px',
                                                background: '#065f46',
                                                border: '1px solid #10b981',
                                                borderRadius: '6px',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ▲ Higher
                                        </button>
                                        <button
                                            onClick={() => handleGuess('lower')}
                                            style={{
                                                padding: '10px 18px',
                                                background: '#7f1d1d',
                                                border: '1px solid #ef4444',
                                                borderRadius: '6px',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ▼ Lower
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ marginTop: '14px' }}>
                                    <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                                        MARKET CAP (RANK #{coinB.market_cap_rank})
                                    </p>
                                    <p
                                        style={{
                                            color: lastGuessCorrect ? '#10b981' : '#ef4444',
                                            fontSize: '1.35rem',
                                            fontWeight: 'bold',
                                            margin: '4px 0'
                                        }}
                                    >
                                        ${coinB.market_cap.toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Round Result & Next Button */}
                    {revealed && (
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <p
                                style={{
                                    fontWeight: 'bold',
                                    color: lastGuessCorrect ? '#10b981' : '#ef4444',
                                    marginBottom: '10px'
                                }}
                            >
                                {lastGuessCorrect
                                    ? `Spot on! ${coinB.name} is ranked #${coinB.market_cap_rank}.`
                                    : `Missed it — ${coinB.name} is ranked #${coinB.market_cap_rank}.`}
                            </p>
                            <button
                                onClick={handleNextDuel}
                                style={{
                                    padding: '10px 22px',
                                    background: '#06b6d4',
                                    color: '#05050a',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Next Matchup →
                            </button>
                        </div>
                    )}

                    {/* Live Market Feed Strip */}
                    <h3 style={{ marginTop: '30px', marginBottom: '12px', color: '#06b6d4' }}>
                        Live Top Market Feed
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '12px'
                        }}
                    >
                        {coins.slice(0, 6).map((coin) => {
                            const isPositive = coin.price_change_percentage_24h >= 0;
                            return (
                                <div
                                    key={coin.id}
                                    style={{
                                        background: '#0d1117',
                                        border: '1px solid #222',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img src={coin.image} alt={coin.name} style={{ width: '28px', height: '28px' }} />
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                                                #{coin.market_cap_rank} {coin.symbol.toUpperCase()}
                                            </div>
                                            <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                                                ${coin.current_price.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        style={{
                                            color: isPositive ? '#10b981' : '#ef4444',
                                            fontWeight: 'bold',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {isPositive ? '+' : ''}
                                        {coin.price_change_percentage_24h?.toFixed(2)}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Re-fetch Trigger */}
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
                <button
                    onClick={() => setFetchCount((prev) => prev + 1)}
                    style={{
                        background: 'transparent',
                        border: '1px solid #444',
                        color: '#9ca3af',
                        padding: '8px 14px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Refresh Live Prices (Fetch #{fetchCount})
                </button>
            </div>
        </div>
    );
}

export default ApiGame;