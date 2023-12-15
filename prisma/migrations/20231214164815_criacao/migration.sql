-- CreateTable
CREATE TABLE "Partners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "userRole" TEXT,
    "email" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_first_access" BOOLEAN NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partnersId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clothing" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "entry_value" DOUBLE PRECISION NOT NULL,
    "output_value" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "is_curated" BOOLEAN NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partnersId" INTEGER NOT NULL,

    CONSTRAINT "Clothing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partners_name_key" ON "Partners"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_partnersId_fkey" FOREIGN KEY ("partnersId") REFERENCES "Partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clothing" ADD CONSTRAINT "Clothing_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clothing" ADD CONSTRAINT "Clothing_partnersId_fkey" FOREIGN KEY ("partnersId") REFERENCES "Partners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
