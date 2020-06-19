-- COMPOUND 
-- temporary table to save underwater Accounts // Just for testing
TRUNCATE TABLE underwater_accounts;
CREATE TABLE underwater_accounts (

    id bigserial NOT NULL,
    blockNumber INTEGER,
    account VARCHAR(67) NOT NULL,
    
    -- Liquidity From Main Chain
    liquidity VARCHAR(100) NOT NULL,
    shortfall VARCHAR(100) NOT NULL,

    -- Liquidity Calculated from grap node 
    g_liquidity VARCHAR(100),
    g_shortfall VARCHAR(100),

    health NUMERIC (5, 2), 
    
    created_at timestamp
);

