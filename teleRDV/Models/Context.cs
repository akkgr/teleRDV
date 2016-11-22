using AspNet.Identity.MongoDB;
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

            Users = database.GetCollection<User>("users");
            Roles = database.GetCollection<Role>("roles");
            Subscribers = database.GetCollection<Subscriber>("subscribers");
            Specialties = database.GetCollection<Specialty>("specialties");
            PaymentMethods = database.GetCollection<PaymentMethod>("paymentmethods");
            SocialSecurityFunds = database.GetCollection<SocialSecurityFund>("socialsecurityfund");
            CallQueues = database.GetCollection<CallQueue>("callqueues");

            EnsureIndexes();
        }

        public IMongoCollection<Role> Roles { get; set; }
        public IMongoCollection<User> Users { get; set; }
        public IMongoCollection<Subscriber> Subscribers { get; set; }
        public IMongoCollection<Specialty> Specialties { get; set; }
        public IMongoCollection<PaymentMethod> PaymentMethods { get; set; }
        public IMongoCollection<SocialSecurityFund> SocialSecurityFunds { get; set; }
        public IMongoCollection<CallReason> CallReasons { get; set; }
        public IMongoCollection<CallQueue> CallQueues { get; set; }
        public IMongoCollection<CallEntry> CallHistory { get; set; }

        private void EnsureIndexes()
        {
            var options = new CreateIndexOptions();
            options.Unique = true;

            Users.Indexes.CreateOneAsync(Builders<User>.IndexKeys.Ascending(d => d.UserName), options);
            Users.Indexes.CreateOneAsync(Builders<User>.IndexKeys.Ascending(d => d.Email), options);
            Roles.Indexes.CreateOneAsync(Builders<Role>.IndexKeys.Ascending(d => d.Name), options);
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
        }
    }
}