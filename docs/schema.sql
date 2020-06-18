-- COMPOUND 
-- temporary table to save underwater Accounts // Just for testing
CREATE TABLE underwater_accounts (
    id bigserial NOT NULL,
    blockNumber INTEGER NOT NULL,
    account VARCHAR(67) NOT NULL,
    
    -- Liquidity From Main Chain
    liquidity VARCHAR(100) NOT NULL,
    shortfall VARCHAR(100) NOT NULL,

    -- Liquidity Calculated from grap node 
    g_liquidity VARCHAR(100) NOT NULL,
    g_shortfall VARCHAR(100) NOT NULL,
    
    created_at timestamp
);

