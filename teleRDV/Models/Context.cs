using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace teleRDV.Models
{
    public class Context
    {
        public IMongoClient Client { get; private set; }
        public IMongoDatabase Database { get; private set; }

        public Context()
        {
            Client = new MongoClient(Properties.Settings.Default.Connection);
            Database = Client.GetDatabase(Properties.Settings.Default.Database);

            Subscribers = Database.GetCollection<Subscriber>("subscribers");
            Specialties = Database.GetCollection<Specialty>("specialties");
            PaymentMethods = Database.GetCollection<PaymentMethod>("paymentmethods");
            SocialSecurityFunds = Database.GetCollection<SocialSecurityFund>("socialsecurityfund");
        }

        public IMongoCollection<Subscriber> Subscribers { get; set; }
        public IMongoCollection<Specialty> Specialties { get; set; }
        public IMongoCollection<PaymentMethod> PaymentMethods { get; set; }
        public IMongoCollection<SocialSecurityFund> SocialSecurityFunds { get; set; }

        public static void Init()
        {
            BsonClassMap.RegisterClassMap<Subscriber>(cm =>
            {
                cm.AutoMap();
                cm.SetIdMember(cm.GetMemberMap(c => c.Id)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId))
                    .SetIdGenerator(StringObjectIdGenerator.Instance));
            });

            BsonClassMap.RegisterClassMap<Specialty>(cm =>
            {
                cm.AutoMap();
                cm.SetIdMember(cm.GetMemberMap(c => c.Id)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId))
                    .SetIdGenerator(StringObjectIdGenerator.Instance));
            });

            BsonClassMap.RegisterClassMap<PaymentMethod>(cm =>
            {
                cm.AutoMap();
                cm.SetIdMember(cm.GetMemberMap(c => c.Id)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId))
                    .SetIdGenerator(StringObjectIdGenerator.Instance));
            });

            BsonClassMap.RegisterClassMap<SocialSecurityFund>(cm =>
            {
                cm.AutoMap();
                cm.SetIdMember(cm.GetMemberMap(c => c.Id)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId))
                    .SetIdGenerator(StringObjectIdGenerator.Instance));
            });
        }
    }
}