﻿// <auto-generated />
using System;
using AppointmentSystem.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AppointmentSystem.Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AppointmentSystem.Server.Models.About", b =>
                {
                    b.Property<int>("AboutId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AboutId"));

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AboutId");

                    b.ToTable("Abouts");

                    b.HasData(
                        new
                        {
                            AboutId = 1,
                            Content = "addasdasdasdsadasdasd",
                            ImageUrl = "",
                            Title = "Hakkımızda"
                        });
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.Appointment", b =>
                {
                    b.Property<int>("AppointmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AppointmentId"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("DoctorId")
                        .HasColumnType("int");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<TimeSpan>("Time")
                        .HasColumnType("time");

                    b.HasKey("AppointmentId");

                    b.HasIndex("DoctorId");

                    b.HasIndex("PatientId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.Blog", b =>
                {
                    b.Property<int>("BlogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BlogId"));

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BlogId");

                    b.ToTable("Blogs");

                    b.HasData(
                        new
                        {
                            BlogId = 1,
                            Content = "adasdad",
                            ImageUrl = "",
                            Title = "dadsdada"
                        },
                        new
                        {
                            BlogId = 2,
                            Content = "adasdad",
                            ImageUrl = "",
                            Title = "dadsdada"
                        },
                        new
                        {
                            BlogId = 3,
                            Content = "adasdad",
                            ImageUrl = "",
                            Title = "dadsdada"
                        });
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.Contact", b =>
                {
                    b.Property<int>("ContactId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ContactId"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ContactId");

                    b.ToTable("Contacts");

                    b.HasData(
                        new
                        {
                            ContactId = 1,
                            Address = "adsdasd",
                            Email = "a",
                            PhoneNumber = "87478487"
                        });
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.FeedBack", b =>
                {
                    b.Property<int>("FeedBackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FeedBackId"));

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.Property<int>("Point")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("FeedBackId");

                    b.ToTable("FeedBacks");
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.Result", b =>
                {
                    b.Property<int>("ResultId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ResultId"));

                    b.Property<int>("AppointmentId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("DoctorId")
                        .HasColumnType("int");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PatientId")
                        .HasColumnType("int");

                    b.HasKey("ResultId");

                    b.ToTable("Results");
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            RoleId = 1,
                            RoleName = "Admin"
                        },
                        new
                        {
                            RoleId = 2,
                            RoleName = "Doctor"
                        },
                        new
                        {
                            RoleId = 3,
                            RoleName = "User"
                        });
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "Ahmet@gmail.com",
                            ImageUrl = "",
                            Name = "Dr. Ahmet",
                            Password = "Ahmet.12",
                            RoleId = 2,
                            Surname = "Yılmaz"
                        },
                        new
                        {
                            UserId = 2,
                            Email = "Mehmet@gmail.com",
                            ImageUrl = "",
                            Name = "Dr. Mehmet",
                            Password = "Mehmet.12",
                            RoleId = 2,
                            Surname = "Dinçer"
                        },
                        new
                        {
                            UserId = 3,
                            Email = "Ali@gmail.com",
                            ImageUrl = "",
                            Name = "Dr. Ali",
                            Password = "Ali.12",
                            RoleId = 2,
                            Surname = "Akın"
                        },
                        new
                        {
                            UserId = 4,
                            Email = "Abdurrahman@gmail.com",
                            ImageUrl = "",
                            Name = "Dr. Abdurrahman",
                            Password = "Abdurrahman.12",
                            RoleId = 2,
                            Surname = "Orman"
                        },
                        new
                        {
                            UserId = 5,
                            Email = "Enes@gmail.com",
                            ImageUrl = "",
                            Name = "Dr. Enes",
                            Password = "Enes.12",
                            RoleId = 2,
                            Surname = "Altın"
                        },
                        new
                        {
                            UserId = 6,
                            Email = "Yusuf@gmail.com",
                            ImageUrl = "",
                            Name = "Yusuf",
                            Password = "Yusuf.12",
                            RoleId = 3,
                            Surname = "Bozkurt"
                        },
                        new
                        {
                            UserId = 7,
                            Email = "Tahir@gmail.com",
                            ImageUrl = "",
                            Name = "Tahir",
                            Password = "Ahmet.12",
                            RoleId = 3,
                            Surname = "Orman"
                        },
                        new
                        {
                            UserId = 8,
                            Email = "Admin@gmail.com",
                            ImageUrl = "",
                            Name = "Admin",
                            Password = "Admin.12",
                            RoleId = 1,
                            Surname = "Admin"
                        });
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.Appointment", b =>
                {
                    b.HasOne("AppointmentSystem.Server.Models.User", "Doctor")
                        .WithMany()
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("AppointmentSystem.Server.Models.User", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Doctor");

                    b.Navigation("Patient");
                });

            modelBuilder.Entity("AppointmentSystem.Server.Models.User", b =>
                {
                    b.HasOne("AppointmentSystem.Server.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });
#pragma warning restore 612, 618
        }
    }
}
