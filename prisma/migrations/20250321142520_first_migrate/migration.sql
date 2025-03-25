-- CreateTable
CREATE TABLE "jokes" (
    "joke_id" SERIAL NOT NULL,
    "joke" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "jokes_pkey" PRIMARY KEY ("joke_id")
);

-- CreateTable
CREATE TABLE "riddles" (
    "riddle_id" SERIAL NOT NULL,
    "riddle" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "riddles_pkey" PRIMARY KEY ("riddle_id")
);
