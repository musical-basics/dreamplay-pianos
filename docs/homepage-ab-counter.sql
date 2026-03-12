-- Homepage A/B Test Global Counter
-- This table stores a single row with a counter that increments atomically
-- to ensure true round-robin assignment across all visitors.

CREATE TABLE IF NOT EXISTS homepage_ab_counter (
    id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),  -- Ensures only one row
    counter bigint NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Insert the initial row
INSERT INTO homepage_ab_counter (id, counter) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- Atomic increment function that returns the PREVIOUS counter value
-- (so first visitor = 0, second = 1, etc.)
CREATE OR REPLACE FUNCTION increment_homepage_ab_counter()
RETURNS bigint AS $$
DECLARE
    prev_val bigint;
BEGIN
    UPDATE homepage_ab_counter
    SET counter = counter + 1,
        updated_at = now()
    WHERE id = 1
    RETURNING counter - 1 INTO prev_val;

    RETURN prev_val;
END;
$$ LANGUAGE plpgsql;


-- ============================================
-- Checkout A/B Test Global Counter
-- ============================================
-- Same pattern for checkout (/checkout vs /customize)

CREATE TABLE IF NOT EXISTS checkout_ab_counter (
    id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    counter bigint NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

INSERT INTO checkout_ab_counter (id, counter) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION increment_checkout_ab_counter()
RETURNS bigint AS $$
DECLARE
    prev_val bigint;
BEGIN
    UPDATE checkout_ab_counter
    SET counter = counter + 1,
        updated_at = now()
    WHERE id = 1
    RETURNING counter - 1 INTO prev_val;

    RETURN prev_val;
END;
$$ LANGUAGE plpgsql;
