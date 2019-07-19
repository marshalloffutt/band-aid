--DROP DATABASE [ IF EXISTS ] { database_name | database_snapshot_name } [ ,...n ] [;]
IF EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'BandAid'
)
    BEGIN
        -- Delete Database Backup and Restore History from MSDB System Database
        EXEC msdb.dbo.sp_delete_database_backuphistory @database_name = N'BandAid'
        -- GO

        -- Close Connections
        USE [master]
        -- GO
        ALTER DATABASE [BandAid] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
        -- GO

        -- Drop Database in SQL Server
        DROP DATABASE [BandAid]
        -- GO
    END


-- Create a new database called 'BandAid'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT [name]
        FROM sys.databases
        WHERE [name] = N'BandAid'
)

CREATE DATABASE BandAid
GO

USE [BandAid]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Create all the tables --

CREATE TABLE [dbo].[Band](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Genre] [varchar](50) NOT NULL,
	[Description] [varchar](300) NOT NULL,
	[LogoUrl] [varchar](200) NULL,
	[DateCreated] [datetime] NOT NULL,
	[Inactive] [bit] NOT NULL,
	[City] [varchar](50) NOT NULL,
	[State] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Band] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BandMember]    Script Date: 7/16/2019 7:02:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BandMember](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MusicianId] [int] NOT NULL,
	[BandId] [int] NOT NULL,
	[DateJoined] [datetime] NOT NULL,
 CONSTRAINT [PK_BandMember] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Posting]    Script Date: 7/16/2019 7:02:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posting](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InstrumentRequested] [varchar](50) NOT NULL,
	[Description] [varchar](300) NULL,
	[Closed] [bit] NOT NULL,
	[BandId] [int] NOT NULL,
 CONSTRAINT [PK_Posting] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PostingReply]    Script Date: 7/16/2019 7:02:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PostingReply](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PostingId] [int] NOT NULL,
	[MusicianId] [int] NOT NULL,
	[Message] [varchar](300) NULL,
	[DateCreated] [datetime] NOT NULL,
	[Closed] [bit] NOT NULL,
 CONSTRAINT [PK_PostingReply] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shindig]    Script Date: 7/16/2019 7:02:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shindig](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](300) NULL,
	[EventDate] [datetime] NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[State] [varchar](50) NOT NULL,
	[Zipcode] [int] NOT NULL,
	[HasComeToPass] [bit] NOT NULL,
	[BandId] [int] NOT NULL,
 CONSTRAINT [PK_Event] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 7/16/2019 7:02:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[Phone] [bigint] NULL,
	[Address] [varchar](50) NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Zipcode] [varchar](50) NULL,
	[Instrument] [varchar](50) NOT NULL,
	[YearsOfExp] [int] NULL,
	[ImageUrl] [varchar](200) NULL,
	[Inactive] [bit] NOT NULL,
 CONSTRAINT [PK_Musician] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Establish relationships
ALTER TABLE [dbo].[BandMember]  WITH CHECK ADD  CONSTRAINT [FK_BandMember_Band] FOREIGN KEY([BandId])
REFERENCES [dbo].[Band] ([Id])
GO
ALTER TABLE [dbo].[BandMember] CHECK CONSTRAINT [FK_BandMember_Band]
GO
ALTER TABLE [dbo].[BandMember]  WITH CHECK ADD  CONSTRAINT [FK_BandMember_Musician] FOREIGN KEY([MusicianId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[BandMember] CHECK CONSTRAINT [FK_BandMember_Musician]
GO
ALTER TABLE [dbo].[Posting]  WITH CHECK ADD  CONSTRAINT [FK_Posting_Band] FOREIGN KEY([BandId])
REFERENCES [dbo].[Band] ([Id])
GO
ALTER TABLE [dbo].[Posting] CHECK CONSTRAINT [FK_Posting_Band]
GO
ALTER TABLE [dbo].[PostingReply]  WITH CHECK ADD  CONSTRAINT [FK_PostingReply_Musician] FOREIGN KEY([MusicianId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[PostingReply] CHECK CONSTRAINT [FK_PostingReply_Musician]
GO
ALTER TABLE [dbo].[PostingReply]  WITH CHECK ADD  CONSTRAINT [FK_PostingReply_Posting] FOREIGN KEY([PostingId])
REFERENCES [dbo].[Posting] ([Id])
GO
ALTER TABLE [dbo].[PostingReply] CHECK CONSTRAINT [FK_PostingReply_Posting]
GO
USE [master]
GO
ALTER DATABASE [BandAid] SET  READ_WRITE
GO

USE [BandAid]
-- User Seed Data
-- Nashville-based musicians 1-7
INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Austin','Cumberlander','austin@cumberlander.com','2019-07-16', 6156453322, '3300 Broadmeade Ct', 'Nashville', 'Tennessee', 'Bass', 12, 'https://avatars2.githubusercontent.com/u/24642982?s=460&v=4', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Colin','White','colin@white.com','2019-07-16', 2813323372, '2451 Bellaire Dr', 'Nashville', 'Tennessee', 'Drums', 11, 'https://media.licdn.com/dms/image/C5603AQEfbnZSDdRYyA/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=65IUVetFQq0AmwMsofd8rd1Hw0Ua8Nvvm169WYGhXqM', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Feven','Mulugeta','feven@mulugeta.com','2019-07-16', 5679345633, '2101 Montgomery Blvd', 'Nashville', 'Tennessee', 'French Horn', 20, 'https://media.licdn.com/dms/image/C4D03AQE2683agbx1yg/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=JscxjM0b2iSWoJ8eC2BHGLt8HgI2nKUoRroo0U_QvQQ', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Martin','Cross','martin@cross.com','2019-07-16', 3354778965, '121 Rushmore Cir', 'Nashville', 'Tennessee', 'Xylophone', 18, 'https://media.licdn.com/dms/image/C4E03AQHHJdLII0g_uA/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=BLeOm3CcIRcqWaGOSJNJtioW95QYTvshMDexxx32gBU', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Robert','Rice','rob@rice.com','2019-07-16', 6687651122, '5644 Console Logs Dr', 'Nashville', 'Tennessee', 'Drums', 7, 'https://media.licdn.com/dms/image/C4E03AQHM9Re92aFXIQ/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=xHB_0wM87nCJoguLWgX-Jutzp_E0vv8fGiAXJ36XMBE', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Adam','Wieckert','adam@wieckert.com','2019-07-16', 6573345689, '1245 Kings Cross Ave', 'Nashville', 'Tennessee', 'Violin', 11, 'https://media.licdn.com/dms/image/C4D03AQH6UCibZYVNuw/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=mK-a53GwJDDvoKv_6dKEdG43-L-R9quyTJGhEtBP61M', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Dylan','Murray','dylan@murray.com','2019-07-16', 3556768932, '310 Terry Blvd', 'Nashville', 'Tennessee', 'Harmonica', 16, 'https://media.licdn.com/dms/image/C4D03AQH4J7B2zSV1HQ/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=D9CkcsRbJU290o1MelxW0tXoP03GJ8sVOg_m72vs67w', 0)

-- Houston-based musicians 8-14
INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Chase','Hamby','chase@hamby.com','2019-07-16', 6156323372, '301 Torrance Dr', 'Houston', 'Texas', 'Lead Guitar', 7, 'https://avatars1.githubusercontent.com/u/16019344?s=460&v=4', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Jasmine','Walters','jasmine@walters.com','2019-07-16', 6674435612, '4700 Wesleyan Dr', 'Houston', 'Texas', 'Trombone', 8, 'https://media.licdn.com/dms/image/C5603AQEgS_0mFk3GHQ/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=2qK2B8C88ritFNUrzaooLcfkd_vdC6jHoV6kwVYgbt4', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Marco','Crank','marco@crank.com','2019-07-16', 6537383448, '2663 Dungeons & Dragons Blvd', 'Houston', 'Texas', 'Bass', 9, 'https://media.licdn.com/dms/image/C4E03AQHiLw-gHtp_Pg/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=VvxcJpeTK-yKQbZ9jrBIuSN1tQ9kGWMgXuFnK2aDKtQ', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Mary','Rys','mary@rys.com','2019-07-16', 2556998765, '936 Barry Allen Dr', 'Houston', 'Texas', 'Vocals', 22, 'https://media.licdn.com/dms/image/C4D03AQERoAANk53kmA/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=QvFkV5qVZkBzf0EPlGh9HCkFh2kB15Lz4UgVu-UEGKo', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Michelle','Beshears','michelle@beshears.com','2019-07-16', 5543768967, '6679 Franklintonshire Ct', 'Houston', 'Texas', 'Alto Saxophone', 12, 'https://media.licdn.com/dms/image/C5603AQFSYuRdM9Mi5A/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=irzPc1nV7XTDH7ZS13n3ykf33d5bSR9Pxlo9Ex4ynVk', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Shane','Wilson','shane@wilson.com','2019-07-16', 6295564323, '2112 Canada Dr', 'Houston', 'Texas', 'Keytar', 2, 'https://media.licdn.com/dms/image/C4E03AQFRhH9cF3zuEA/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=fl0Q_66X3uR2R5zuAI4CTK0Yp10h3QoXgCZevJD3i7w', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Rich','Fisher','richard@fish.com','2019-07-16', 5637789987, '2109 Fishman Ct', 'Houston', 'Texas', 'Guitar', 12, 'https://avatars0.githubusercontent.com/u/42363523?s=460&v=4', 0)

-- Chicago-based musicians 15-18
INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Jonathan','Mohan','jon@mohan.com','2019-07-16', 7653345534, '455 Toronto Blvd', 'Chicago', 'Illinois', 'Vocals', 33, 'https://media.licdn.com/dms/image/C4E03AQETX6swKcW6TQ/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=YE6vo5P52rGrnoXSkVsZCAJ5kFdIkqWg4nMDEkkNLKY', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Maggie','Leavell','maggie@leavell.com','2019-07-16', 7764483336, '7854 Falcon Ct', 'Chicago', 'Illinois', 'Drums', 16, 'https://media.licdn.com/dms/image/C4E03AQFDgRxxwJfCSw/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=3T1i7NMIpw2FJ1n0o4VrEl5qUL-hw9EufhkdbuA0Nv0', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Wayne','Collier','wayne@collier.com','2019-07-16', 9865536688, '310 Temple Ave', 'Chicago', 'Illinois', 'Trumpet', 25, 'https://media.licdn.com/dms/image/C4D03AQFyGJP7G92jNw/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=5WvgpOg4b7PSZwDjmQIGW5vsVK9_I4voFC5cO7yiGWY', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Nathan','Gonzalez','nate@gonzo.com','2019-07-16', 6447896689, '1005 CopyPasta Dr', 'Chicago', 'Illinois', 'Keyboard', 11, 'https://media.licdn.com/dms/image/C5603AQHXNsWNdxY38Q/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=Xjh2p6Qoob26bKy09iFgqy45yVsS3v7Bot_okRzrDBI', 0)

-- Los Angeles-based musicians 19-22
INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Lance','Hamilton','lance@hamilton.com','2019-07-16', 2254476699, '487 Jenkins Dr', 'Los Angeles', 'California', 'Vocals', 28, 'https://media.licdn.com/dms/image/C4E03AQGufg_54fDDAg/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=-dGbi60hTB_jXjDS5BOfOQRDaLFYsVirH5oF5lNzE10', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Ripal','Patel','ripal@patel.com','2019-07-16', 3557789876, '56 Count Dracula Blvd', 'Los Angeles', 'California', 'Flute', 16, 'https://media.licdn.com/dms/image/C4E03AQFCm0GyqYbNjw/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=jSvbMGGwZRQqNWjg7vftYiaW3pxckMUW517w4EHVAMs', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Tim','Harley','timmy@harley.com','2019-07-16', 7786546654, '36 Ackerman Blvd', 'Los Angeles', 'California', 'Alto Saxophone', 22, 'https://media.licdn.com/dms/image/C5603AQEtPZARH6E9wA/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=pzQKS61usdyyrG-UuY1ekWo2iQEKQ7hxb3ye4giJws8', 0)

INSERT INTO [dbo].[User] ([FirstName], [LastName], [Email], [DateCreated], [Phone], [Address], [City], [State], [Instrument], [YearsOfExp], [ImageUrl], [Inactive])
VALUES ('Mohammad','Khezri','mo@kez-man.com','2019-07-16', 7683376678, '455 Titans Way', 'Los Angeles', 'California', 'Harpischord', 11, 'https://media.licdn.com/dms/image/C4E03AQGbZbYsKA8QrQ/profile-displayphoto-shrink_800_800/0?e=1568851200&v=beta&t=qvdUbiI5w7cVP6hlWblSCCifQ8ibbdpkz34IHvVxqMk', 0)

-- Band Seed Data
INSERT INTO [dbo].[Band] ([Name], [Genre], [Description], [LogoUrl], [DateCreated], [Inactive], [City], [State])
VALUES ('Of Men and Koalas', 'Country', 'A bad Merle-Haggard cover band.', 'tbd', '2019-07-16', 0, 'Nashville', 'Tennessee')

INSERT INTO [dbo].[Band] ([Name], [Genre], [Description], [LogoUrl], [DateCreated], [Inactive], [City], [State])
VALUES ('Satan''s Fingers', 'Metal', 'One of the best ever death metal bands out of Denton.', 'tbd', '2019-07-16', 0, 'Houston', 'Texas')

INSERT INTO [dbo].[Band] ([Name], [Genre], [Description], [LogoUrl], [DateCreated], [Inactive], [City], [State])
VALUES ('Rosie and the Doctors', 'Jazz', 'Lose your mind to the soundscape of RND.', 'tbd', '2019-07-16', 0, 'Chicago', 'Illinois')

INSERT INTO [dbo].[Band] ([Name], [Genre], [Description], [LogoUrl], [DateCreated], [Inactive], [City], [State])
VALUES ('Arthur''s Midnight Goldfish', 'Rock', 'The type of soft-rock your dad used to listen to.', 'tbd', '2019-07-16', 0, 'Nashville', 'Tennessee')

INSERT INTO [dbo].[Band] ([Name], [Genre], [Description], [LogoUrl], [DateCreated], [Inactive], [City], [State])
VALUES ('Compasshead', 'Punk', 'Bad music for bad people.', 'tbd', '2019-07-16', 0, 'Los Angeles', 'California')

-- Posting Seed Data
INSERT INTO [dbo].[Posting] ([InstrumentRequested], [Description], [Closed], [BandId]) VALUES ('Guitar', 'Needs to be a good soloist.', 0, 1)
INSERT INTO [dbo].[Posting] ([InstrumentRequested], [Description], [Closed], [BandId]) VALUES ('Keyboard', 'Looking for the next Herbie Hancock!', 0, 2)
INSERT INTO [dbo].[Posting] ([InstrumentRequested], [Description], [Closed], [BandId]) VALUES ('Drums', 'Does anyone in this town play the drums??!?', 0, 3)
INSERT INTO [dbo].[Posting] ([InstrumentRequested], [Description], [Closed], [BandId]) VALUES ('Vocals', 'Need someone who can sang!', 0, 5)

-- Shindig Seed Data
INSERT INTO [dbo].[Shindig] ([Description], [EventDate], [Address], [City], [State], [Zipcode], [HasComeToPass], [BandId])
VALUES ('Rehearsal', '2019-07-16', '6653 Germantown Blvd','Nashville', 'Tennessee', 37433, 0, 4)

INSERT INTO [dbo].[Shindig] ([Description], [EventDate], [Address], [City], [State], [Zipcode], [HasComeToPass], [BandId])
VALUES ('Practice', '2019-07-16', '1123 Blakemore Dr', 'Houston', 'Texas', 34778, 0, 2)

-- Band-Member Seed Data
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (1, 1, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (2, 1, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (3, 4, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (4, 4, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (5, 4, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (8, 2, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (10, 2, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (11, 2, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (13, 2, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (14, 2, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (15, 3, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (16, 3, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (17, 3, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (18, 3, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (19, 5, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (20, 5, '2019-07-16')
INSERT INTO [dbo].[BandMember] ([MusicianId], [BandId], [DateJoined]) VALUES (21, 5, '2019-07-16')

-- Posting-Replies Seed Data
INSERT INTO [dbo].[PostingReply] ([PostingId], [MusicianId], [Message], [DateCreated], [Closed]) VALUES (1, 7, 'Hey! I''m really good!!', '2019-07-16', 0)
INSERT INTO [dbo].[PostingReply] ([PostingId], [MusicianId], [Message], [DateCreated], [Closed]) VALUES (1, 6, 'Hey! I''m even better!!', '2019-07-16', 0)
INSERT INTO [dbo].[PostingReply] ([PostingId], [MusicianId], [Message], [DateCreated], [Closed]) VALUES (2, 9, 'Let''s grab a drink!', '2019-07-16', 0)
INSERT INTO [dbo].[PostingReply] ([PostingId], [MusicianId], [Message], [DateCreated], [Closed]) VALUES (4, 22, 'Recruit me if you wanna win battle of the bands!', '2019-07-16', 0)