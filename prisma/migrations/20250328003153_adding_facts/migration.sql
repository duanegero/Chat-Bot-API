-- CreateTable
CREATE TABLE "facts" (
    "fact_id" SERIAL NOT NULL,
    "fact" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "facts_pkey" PRIMARY KEY ("fact_id")
);
