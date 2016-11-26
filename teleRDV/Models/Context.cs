using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace teleRDV.Models
{
    public class Context
    {
        private IMongoClient client { get; set; }
        private IMongoDatabase database { get; set; }

        public Context()
        {
            client = new MongoClient(Properties.Settings.Default.Connection);
            database = client.GetDatabase(Properties.Settings.Default.Database);

            Users = database.GetCollection<User>("Users");
            Roles = database.GetCollection<Role>("Roles");
            Subscribers = database.GetCollection<Subscriber>("Subscribers");
            Specialties = database.GetCollection<Specialty>("Specialties");
            PaymentMethods = database.GetCollection<PaymentMethod>("PaymentMethods");
            SocialSecurityFunds = database.GetCollection<SocialSecurityFund>("SocialSecurityFunds");
            CallEntries = database.GetCollection<CallEntry>("CallEntries");
            People = database.GetCollection<Person>("People");
            Appointments = database.GetCollection<Appointment>("Appointments");

            EnsureIndexes();
        }

        public IMongoCollection<Role> Roles { get; set; }
        public IMongoCollection<User> Users { get; set; }
        public IMongoCollection<Subscriber> Subscribers { get; set; }
        public IMongoCollection<Specialty> Specialties { get; set; }
        public IMongoCollection<PaymentMethod> PaymentMethods { get; set; }
        public IMongoCollection<SocialSecurityFund> SocialSecurityFunds { get; set; }        
        public IMongoCollection<CallEntry> CallEntries { get; set; }
        public IMongoCollection<Person> People { get; set; }
        public IMongoCollection<Appointment> Appointments { get; set; }

        private void EnsureIndexes()
        {
            var options = new CreateIndexOptions();
            options.Unique = true;

            Users.Indexes.CreateOneAsync(Builders<User>.IndexKeys.Ascending(d => d.UserName), options);
            Users.Indexes.CreateOneAsync(Builders<User>.IndexKeys.Ascending(d => d.Email), options);
            Roles.Indexes.CreateOneAsync(Builders<Role>.IndexKeys.Ascending(d => d.Name), options);
            Subscribers.Indexes.CreateOneAsync(Builders<Subscriber>.IndexKeys.Ascending("Phones.Value"),options);
            People.Indexes.CreateOneAsync(Builders<Person>.IndexKeys.Ascending("Phones.Value"), options);
        }

        public static void Init()
        {
            BsonClassMap.RegisterClassMap<BaseModel>(cm =>
            {
                cm.AutoMap();
                cm.SetIdMember(cm.GetMemberMap(c => c.Id)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId))
                    .SetIdGenerator(StringObjectIdGenerator.Instance));
            });

            BsonClassMap.RegisterClassMap<Appointment>(cm =>
            {
                cm.AutoMap();
                cm.UnmapMember(c => c.Subscriber);
                cm.UnmapMember(c => c.Person);
                cm.UnmapMember(c => c.User);
            });

            BsonClassMap.RegisterClassMap<Subscriber>(cm =>
            {
                cm.AutoMap();
                cm.UnmapMember(c => c.User);
                cm.UnmapMember(c => c.Specialty);
                cm.UnmapMember(c => c.PaymentMethods);
                cm.UnmapMember(c => c.SocialSecurityFunds);
            });

            BsonClassMap.RegisterClassMap<Person>(cm =>
            {
                cm.AutoMap();
                cm.UnmapMember(c => c.User);
                cm.UnmapMember(c => c.Appointments);
            });

            BsonClassMap.RegisterClassMap<User>(cm =>
            {
                cm.AutoMap();
                cm.UnmapMember(c => c.Password);
                cm.UnmapMember(c => c.OldPassword);
                cm.UnmapMember(c => c.NewPassword);
                cm.UnmapMember(c => c.ConfirmPassword);
            });

            BsonClassMap.RegisterClassMap<CallEntry>(cm =>
            {
                cm.AutoMap();
                cm.UnmapMember(c => c.User);
                cm.UnmapMember(c => c.Person);
            });
        }
    }
}