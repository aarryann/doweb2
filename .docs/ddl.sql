USE hectre;

CREATE TABLE IF NOT EXISTS AppVersion (
  id INT NOT NULL PRIMARY KEY,
  appVersion VARCHAR(100) NOT NULL,
  dbVersion VARCHAR(100) NOT NULL,
  upgradeMode VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  UNIQUE KEY appVersionUK (appVersion, dbVersion),
);

CREATE TABLE IF NOT EXISTS Tenant (
  id INT NOT NULL PRIMARY KEY,
  tenantName VARCHAR(100) NOT NULL UNIQUE,
  appVersionId INT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT tenantAppVersionFK FOREIGN KEY (appVersionId)
    REFERENCES AppVersion (id)
);

CREATE TABLE IF NOT EXISTS User (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT userUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS ActivityStep (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  stepCode VARCHAR(20) UNIQUE NOT NULL,
  stepName VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT activityStepUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Study (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  name VARCHAR(80) NOT NULL,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY studyNameTenantUK (tenantId, name),
  CONSTRAINT studyTenantFK FOREIGN KEY (tenantId)
    REFERENCES id(id),
  CONSTRAINT studyUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS StudyVersion (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  studyId INT NOT NULL,
  studyVersion VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY studyVersionUK (studyId, studyVersion),
  CONSTRAINT versionStudyFK FOREIGN KEY (studyId)
    REFERENCES Study (id),
  CONSTRAINT studyVersionUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS StudyEvent (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  studyId INT NOT NULL,
  eventCode VARCHAR(20) NOT NULL,
  eventName VARCHAR(50) NOT NULL,
  eventOrder INT NOT NULL,
  duration INT NOT NULL,
  durationUnit VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY studyEventNameUK (studyId, eventName),
  UNIQUE KEY studyEventCodeUK (studyId, eventCode),
  CONSTRAINT eventStudyFK FOREIGN KEY studyId)
    REFERENCES Study(id),
  CONSTRAINT eventUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS StudyConsent (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  studyId INT NOT NULL,
  versionId INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY studyConsentUK (studyId, versionId),
  CONSTRAINT consentStudyFK FOREIGN KEY (studyId)
    REFERENCES Study(id),
  CONSTRAINT consentStudyVersionFK FOREIGN KEY (versionId)
    REFERENCES StudyVersion(id),
  CONSTRAINT consentUpdatedByFK FOREIGN KEY (UpdatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Site (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY siteUK (tenantId, name),
  CONSTRAINT siteTenantFK FOREIGN KEY (tenantId)
    REFERENCES id (id),
  CONSTRAINT siteUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS SiteRegisteredStudy (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  studyId INT NOT NULL,
  versionId INT NOT NULL,
  siteId INT NOT NULL,
  registeredOn DATETIME NOT NULL,
  isCurrent VARCHAR(3) NOT NULL,
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY siteRegisteredStudyUK (siteId, studyId, versionId),
  CONSTRAINT siteRegisteredStudyFK FOREIGN KEY (studyId)
    REFERENCES Study(id),
  CONSTRAINT siteRegisteredStudyVersionFK FOREIGN KEY (versionId)
    REFERENCES StudyVersion(id),
  CONSTRAINT siteRegisteredStudySiteFK FOREIGN KEY (siteId)
    REFERENCES Site(id),
  CONSTRAINT siteRegisteredStudyUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS PID_COUNTER_ASSIGNMENTS (
  siteRegisteredStudyId INT NOT NULL PRIMARY KEY,
  minPid INT,
  maxPid INT,
  lastPid INT NOT NULL,
  minSitePid INT,
  maxSitePid INT,
  lastSitePid INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT pidCounterRegisteredStudyFK FOREIGN KEY (siteRegisteredStudyId)
    REFERENCES SiteRegisteredStudy(id)
);

CREATE TABLE IF NOT EXISTS TenantAddress (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  type VARCHAR(20) NOT NULL,
  isPrimary VARCHAR(3) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT tenantAddressFK FOREIGN KEY (tenantId)
    REFERENCES id (id),
  CONSTRAINT tenantAddressUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS TenantUser (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  userId INT NOT NULL,
  lastLoginOn DATETIME,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY tenantUserUK (tenantId, userId),
  CONSTRAINT tenantUserTenantFK FOREIGN KEY (tenantId)
    REFERENCES id (id),
  CONSTRAINT tenantUserFK FOREIGN KEY (userId)
    REFERENCES User (id),
  CONSTRAINT tenantUserUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS TenantStudy (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  studyId INT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY tenantStudyUK (tenantId, studyId),
  CONSTRAINT tenantStudyTenantFK FOREIGN KEY (tenantId)
    REFERENCES id (id),
  CONSTRAINT tenantStudyFK FOREIGN KEY (studyId)
    REFERENCES Study (id),
  CONSTRAINT tenantStudyUptedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);
CREATE TABLE IF NOT EXISTS TenantSite (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  siteId INT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY tenantSiteUK (tenantId, siteId),
  CONSTRAINT tenantSiteTenantFK FOREIGN KEY (tenantId)
    REFERENCES id (id),
  CONSTRAINT tenantSiteFK FOREIGN KEY (siteId)
    REFERENCES Site (id),
  CONSTRAINT tenantSiteUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);


CREATE TABLE IF NOT EXISTS Screening (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  mrn VARCHAR(50),
  firstName VARCHAR(200) NOT NULL,
  middleInitial VARCHAR(10),
  lastName VARCHAR(200) NOT NULL,
  currentGender VARCHAR(50) NOT NULL,
  dob DATETIME NOT NULL,
  screenedOn DATETIME NOT NULL,
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY screeningTenantMrnUK (tenantId, mrn),
  CONSTRAINT screeningTenantFK FOREIGN KEY (tenantId)
    REFERENCES Tenant (id),
  CONSTRAINT screeningUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Subject (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  mrn VARCHAR(50),
  pid VARCHAR(50) NOT NULL,
  firstName VARCHAR(200) NOT NULL,
  middleInitial VARCHAR(10),
  lastName VARCHAR(200) NOT NULL,
  currentGender VARCHAR(50) NOT NULL,
  dob DATETIME NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY subjectTenantMrnUK (tenantId, mrn),
  UNIQUE KEY subjectTenantPidUK (tenantId, pid),
  CONSTRAINT subjectTenantFK  FOREIGN KEY (tenantId)
    REFERENCES Tenant(id),
  CONSTRAINT subjectUpdatedByFK FOREIGN KEY (updatedBy)
	REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS StudySubject (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  subjectId INT,
  screeningId INT NOT NULL,
  siteId INT NOT NULL,
  studyId INT NOT NULL,
  sitePid VARCHAR(20),
  enrollmentDate DATETIME,
  enrollmentStatus VARCHAR(50) NOT NULL,
  enrollmentStatusDate DATETIME NOT NULL,
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY studySubjectUK (studyId, subjectId),
  CONSTRAINT studySubjectFK FOREIGN KEY (subjectId)
    REFERENCES Subject (id),
  CONSTRAINT studySubjectScreeningFK FOREIGN KEY (screeningId)
    REFERENCES Screening (id),
  CONSTRAINT studySubjectSiteFK FOREIGN KEY (siteId)
    REFERENCES Site (siteId),
  CONSTRAINT studySubjectStudyFK FOREIGN KEY (studyId)
    REFERENCES Study (id),
  CONSTRAINT studySubjectUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS SubjectVisit (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  studySubjectId INT NOT NULL,
  versionId INT NOT NULL,
  eventCode VARCHAR(20) NOT NULL,
  eventName VARCHAR(200) NOT NULL,
  isUnscheduled VARCHAR(3),
  visitDate DATETIME NOT NULL,
  visitReason VARCHAR(200),
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY subjectVisitUK (studySubjectId, eventCode, eventName),
  CONSTRAINT subjectVisitEventCodeFK FOREIGN KEY (eventCode)
    REFERENCES StudyEvent (eventCode),
  CONSTRAINT visitSubjectFK FOREIGN KEY (studySubjectId)
    REFERENCES StudySubject (id),
  CONSTRAINT subjectVisitUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS SubjectConsent (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  studySubjectId INT NOT NULL,
  studyConsentId INT NOT NULL,
  consentedOn DATETIME NOT NULL,
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY subjectConsentUK (studySubjectId, studyConsentId),
  CONSTRAINT subjectConsentSiteSubjectFK FOREIGN KEY (studySubjectId)
	REFERENCES StudySubject (id),
  CONSTRAINT subjectConsentFK FOREIGN KEY (studyConsentId)
    REFERENCES studyConsent(id),
  CONSTRAINT subjectConsentUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS TenantStep (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  stepCode VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY tenantStepUK (tenantId, stepCode),
  CONSTRAINT tenantStepTenantFK FOREIGN KEY (tenantId)
    REFERENCES Tenant(id),
  CONSTRAINT tenantStepFK FOREIGN KEY (stepCode)
    REFERENCES ActivityStep(stepCode),
  CONSTRAINT updatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS EventStep (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  studyId INT NOT NULL,
  eventCode VARCHAR(20) NOT NULL,
  groupName VARCHAR(50),
  stepCode VARCHAR(20),
  groupId INT,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT eventStepStudyFK FOREIGN KEY (studyId)
    REFERENCES Study(id),
  CONSTRAINT stepEventCodeFK FOREIGN KEY (studyId, eventCode)
    REFERENCES StudyEvent(studyId, eventCode),
  CONSTRAINT eventStepFK FOREIGN KEY (stepCode)
    REFERENCES ActivityStep(stepCode),
  CONSTRAINT eventStepGroupFK FOREIGN KEY (groupId)
    REFERENCES StudyEventStep(id),
  CONSTRAINT eventStepUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS VisitSummary (
  subjectVisitId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  issueCount INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT visitSummarySubjectFK FOREIGN KEY (subjectVisitId)
    REFERENCES SubjectVisit(id)
);

CREATE TABLE IF NOT EXISTS VisitDetail (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  subjectVisitId INT NOT NULL,
  stepCode VARCHAR(20) NOT NULL,
  issueCount INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY visitDetailUK (subjectVisitId, stepCode),
  CONSTRAINT visitDetailStepFK FOREIGN KEY (stepCode)
    REFERENCES ActivityStep(stepCode)
);

CREATE TABLE IF NOT EXISTS Demographic (
  studySubjectId INT NOT NULL PRIMARY KEY,
  birthGender VARCHAR(20) NOT NULL,
  race VARCHAR(50) NOT NULL,
  ethnicity VARCHAR(20) NOT NULL,
  birthCountry VARCHAR(2) NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT demographicsSubjectFK FOREIGN KEY (studySubjectId)
    REFERENCES StudySubject (id),
  CONSTRAINT demographicUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Test (
  id INT NOT NULL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT testUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS TenantTest (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY tenantTestCodeUK (tenantId, code),
  CONSTRAINT tenantTestTenantFK FOREIGN KEY (tenantId)
    REFERENCES Tenant (id),
  CONSTRAINT tenantTestFK FOREIGN KEY (code)
    REFERENCES Test (code),
  CONSTRAINT tenantTestUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Medication (
  id INT NOT NULL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  description VARCHAR(200) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT medicationUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS TenantMedication (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY tenantMedicationCodeUK (tenantId, code),
  CONSTRAINT tenantMedicationTenantFK FOREIGN KEY (tenantId)
    REFERENCES Tenant (id),
  CONSTRAINT tenantMedicationCodeFK FOREIGN KEY (code)
    REFERENCES Medication(code),
  CONSTRAINT tenantMedicationUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Referral (
  id INT NOT NULL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  description VARCHAR(200) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT referralUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS TenantReferral (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tenantId INT NOT NULL,
  code VARCHAR(20) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY tenantReferralUK (tenantId, code),
  CONSTRAINT tenantReferralTenantFK FOREIGN KEY (tenantId)
    REFERENCES Tenant (id),
  CONSTRAINT tenantReferralCodeFK FOREIGN KEY (code)
    REFERENCES Referral(code),
  CONSTRAINT tenantReferralUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);


CREATE TABLE IF NOT EXISTS VisitTest (
  id INT NOT NULL PRIMARY KEY,
  studySubjectId INT NOT NULL,
  testCode VARCHAR(20) NOT NULL,
  placedOn DATETIME NOT NULL,
  effectiveOn DATETIME,
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT visitTestFK FOREIGN KEY (testCode)
    REFERENCES Test(code),
  CONSTRAINT visitTestUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS VisitOrder (
  id INT NOT NULL PRIMARY KEY,
  studySubjectId INT NOT NULL,
  orderCode VARCHAR(20) NOT NULL,
  orderDate DATETIME NOT NULL,
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT visitOrderCodeFK FOREIGN KEY (orderCode)
    REFERENCES Order(code),
  CONSTRAINT visitOrderUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS VisitReferral (
  id INT NOT NULL PRIMARY KEY,
  studySubjectId INT NOT NULL,
  referralCode VARCHAR(20) NOT NULL,
  referredOn DATETIME NOT NULL,
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT visitReferralCodeFK FOREIGN KEY (referralCode)
    REFERENCES Referral(code),
  CONSTRAINT visitReferralUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS QuestionLibrary (
  id INT NOT NULL PRIMARY KEY,
  tenantId INT NOT NULL,
  libraryName VARCHAR(50) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  updatedBy INT NOT NULL,
  updatedOn DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY questionLibraryTenantUK (tenantId, libraryName),
  CONSTRAINT questionLibraryUpdatedByFK FOREIGN KEY (updatedBy)
    REFERENCES User(id)
);
