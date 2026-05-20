DO $$
BEGIN
  -- Rename legacy title -> titleES if needed
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Projects'
      AND column_name = 'title'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Projects'
      AND column_name = 'titleES'
  ) THEN
    ALTER TABLE "Projects" RENAME COLUMN "title" TO "titleES";
  END IF;

  -- Ensure titleEN exists
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Projects'
      AND column_name = 'titleEN'
  ) THEN
    ALTER TABLE "Projects" ADD COLUMN "titleEN" TEXT NOT NULL DEFAULT '';
  END IF;

  -- Rename legacy description -> descriptionES if needed
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Projects'
      AND column_name = 'description'
  ) AND NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Projects'
      AND column_name = 'descriptionES'
  ) THEN
    ALTER TABLE "Projects" RENAME COLUMN "description" TO "descriptionES";
  END IF;

  -- Ensure descriptionEN exists
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'Projects'
      AND column_name = 'descriptionEN'
  ) THEN
    ALTER TABLE "Projects" ADD COLUMN "descriptionEN" TEXT NOT NULL DEFAULT '';
  END IF;
END
$$;
