const questions = [
  {
    category: "Penser distribué",
    difficulty: "Compréhension",
    scenario: "Une équipe doit lire 1 To de logs. Un seul disque lit à 80 Mo/s et le traitement peut être découpé en fragments indépendants.",
    question: "Quelle décision attaque directement le vrai goulot d’étranglement ?",
    options: [
      "Augmenter uniquement la RAM du serveur, sans changer la lecture disque",
      "Répartir les fragments sur plusieurs disques/nœuds et les lire en parallèle",
      "Compresser le fichier après chaque lecture",
      "Centraliser toutes les données sur un disque encore plus grand"
    ],
    answer: 1,
    explanation: "Le problème est ici le débit de lecture. Si les fragments sont indépendants, plusieurs disques peuvent lire simultanément. Le gain vient du parallélisme, pas d’un composant unique supposé magique.",
    takeaway: "À retenir : quand le travail est parallélisable, on augmente le débit global en répartissant données et travail.",
    image: "assets/cluster.png"
  },
  {
    category: "Penser distribué",
    difficulty: "Application",
    scenario: "Un serveur arrive à ses limites. L’équipe hésite entre acheter une machine toujours plus puissante ou ajouter plusieurs machines standards.",
    question: "Quel choix correspond au scale-out ?",
    options: [
      "Remplacer le CPU par un modèle plus puissant sur la même machine",
      "Ajouter de la RAM au serveur existant",
      "Ajouter plusieurs nœuds et répartir données et calculs",
      "Remplacer les disques locaux par des SSD plus rapides"
    ],
    answer: 2,
    explanation: "Le scale-out consiste à augmenter la capacité horizontalement en ajoutant des machines. Les trois autres réponses renforcent une machine existante : c’est du scale-up.",
    takeaway: "Scale-up = renforcer une machine ; scale-out = ajouter des machines et distribuer.",
    image: "assets/scaleup.png"
  },
  {
    category: "Penser distribué",
    difficulty: "Raisonnement",
    scenario: "On ajoute 20 serveurs à un système, mais toutes les données restent sur une seule machine et tous les calculs y sont envoyés.",
    question: "Pourquoi cette architecture ne bénéficie-t-elle presque pas du scale-out ?",
    options: [
      "Parce que les serveurs doivent obligatoirement partager la même mémoire",
      "Parce que stockage et travail restent concentrés sur un point unique",
      "Parce qu’un cluster ne peut contenir que 10 machines",
      "Parce que le réseau interdit les traitements parallèles"
    ],
    answer: 1,
    explanation: "Ajouter des machines ne suffit pas. Il faut aussi répartir les données et/ou les calculs ; sinon le nœud central reste le goulot d’étranglement.",
    takeaway: "Le scale-out est une architecture, pas simplement un nombre élevé de serveurs.",
    image: "assets/cluster.png"
  },
  {
    category: "Penser distribué",
    difficulty: "Compréhension",
    scenario: "Dans un grand cluster, un nœud de calcul peut tomber en panne pendant une tâche.",
    question: "Quel principe de conception est le plus réaliste ?",
    options: [
      "Supposer que les machines ne tombent jamais en panne",
      "Arrêter définitivement le cluster dès qu’un nœud disparaît",
      "Prévoir la panne et permettre au logiciel de poursuivre ou de réaffecter le travail",
      "Dupliquer uniquement l’interface utilisateur"
    ],
    answer: 2,
    explanation: "Dans un système distribué, les pannes font partie du fonctionnement normal. Le logiciel doit donc les détecter, les tolérer et reconfigurer le travail si nécessaire.",
    takeaway: "La fiabilité d’un cluster vient en grande partie de la redondance et du logiciel.",
    image: "assets/fault_tolerance.png"
  },
  {
    category: "Penser distribué",
    difficulty: "Application",
    scenario: "Un traitement distribué échange en permanence de gros volumes entre tous les nœuds. Le CPU est peu utilisé mais le réseau est saturé.",
    question: "Quelle lecture du problème est la plus pertinente ?",
    options: [
      "Le calcul distribué élimine normalement tout trafic réseau",
      "Le réseau est une ressource critique ; déplacer trop de données peut annuler le bénéfice du parallélisme",
      "Il faut obligatoirement revenir à un seul serveur",
      "La saturation réseau prouve que les données sont déjà locales"
    ],
    answer: 1,
    explanation: "Les machines distribuées ne partagent pas une mémoire commune : elles communiquent par le réseau. Un bon système cherche donc à limiter les déplacements inutiles de données.",
    takeaway: "Dans une architecture distribuée, CPU, disque et réseau sont tous des ressources à gérer.",
    image: "assets/cluster.png"
  },
  {
    category: "Penser distribué",
    difficulty: "Raisonnement",
    scenario: "Deux architectures offrent la même puissance totale. La première dépend d’un seul serveur central ; la seconde répartit les fonctions sur plusieurs nœuds avec redondance.",
    question: "Quel avantage principal la seconde peut-elle offrir ?",
    options: [
      "Elle supprime tout besoin de coordination",
      "Elle garantit qu’aucune panne ne se produira",
      "Elle peut éviter qu’une panne unique arrête tout le système",
      "Elle transforme automatiquement tout traitement en temps réel"
    ],
    answer: 2,
    explanation: "La distribution et la redondance peuvent réduire le risque de point de panne unique. Elles ne suppriment ni les pannes ni la coordination.",
    takeaway: "Distribuer permet de concevoir la tolérance aux pannes, mais rend la coordination plus importante.",
    image: "assets/cluster.png"
  },
  {
    category: "Hadoop & HDFS",
    difficulty: "Choix d’architecture",
    scenario: "Une application doit stocker plusieurs téraoctets de logs et les relire en batch chaque nuit. Les petites mises à jour aléatoires à la milliseconde ne sont pas prioritaires.",
    question: "Quel profil correspond le mieux à HDFS ?",
    options: [
      "Grands fichiers, lectures séquentielles et fort débit",
      "Petites transactions bancaires avec mises à jour aléatoires très fréquentes",
      "Cache mémoire ultra-faible latence uniquement",
      "Base relationnelle transactionnelle pour quelques kilo-octets"
    ],
    answer: 0,
    explanation: "HDFS vise les grands fichiers et le débit global. Il est adapté aux traitements batch et aux lectures séquentielles massives, pas aux petites mises à jour aléatoires à très faible latence.",
    takeaway: "HDFS optimise le passage de gros flux de données, pas l’interactivité milliseconde.",
    image: "assets/hdfs_storage.png"
  },
  {
    category: "Hadoop & HDFS",
    difficulty: "Compréhension",
    scenario: "Un fichier HDFS est écrit une première fois, puis analysé par plusieurs traitements au fil des jours.",
    question: "Quel modèle d’accès cette situation illustre-t-elle le mieux ?",
    options: [
      "Write Once, Read Many",
      "Write Many, Random Update Everywhere",
      "Memory Only",
      "Single Node, Single Reader"
    ],
    answer: 0,
    explanation: "HDFS est conçu pour écrire un fichier puis le relire de nombreuses fois. Les ajouts en fin de fichier sont possibles, mais les petites modifications aléatoires ne sont pas son usage naturel.",
    takeaway: "Le modèle d’accès HDFS simplifie la cohérence et favorise le débit séquentiel.",
    image: "assets/hdfs_storage.png"
  },
  {
    category: "Hadoop & HDFS",
    difficulty: "Calcul simple",
    scenario: "On suppose une taille de bloc HDFS de 128 MiB et un fichier de 300 MiB.",
    question: "Quelle description est correcte ?",
    options: [
      "Le fichier occupe toujours un seul bloc de 300 MiB",
      "Le fichier est découpé en 3 blocs, et le dernier n’utilise qu’environ 44 MiB",
      "Le fichier est découpé en 128 blocs",
      "HDFS duplique obligatoirement le fichier complet 128 fois"
    ],
    answer: 1,
    explanation: "300 MiB = 128 + 128 + 44. HDFS découpe donc le fichier en trois blocs logiques et le dernier n’occupe que l’espace réellement utilisé.",
    takeaway: "La taille de bloc est une taille logique maximale, pas un gaspillage imposé pour le dernier bloc.",
    image: "assets/hdfs_storage.png"
  },
  {
    category: "Hadoop & HDFS",
    difficulty: "Distinction",
    scenario: "Les blocs B1, B2 et B3 d’un fichier sont répartis sur plusieurs DataNodes. B2 possède aussi plusieurs copies.",
    question: "Quelle distinction est correcte ?",
    options: [
      "Répartir B1, B2, B3 = réplication ; copier B2 = distribution",
      "Répartir des blocs différents = distribution ; copier le même bloc = réplication",
      "Distribution et réplication désignent exactement la même opération",
      "La réplication sert uniquement à augmenter la capacité de stockage utile"
    ],
    answer: 1,
    explanation: "La distribution répartit des blocs différents pour la capacité et le parallélisme. La réplication crée plusieurs copies du même bloc pour la disponibilité et la tolérance aux pannes.",
    takeaway: "Distribution ≠ réplication : elles répondent à deux objectifs différents.",
    image: "assets/replication.png"
  },
  {
    category: "Hadoop & HDFS",
    difficulty: "Application",
    scenario: "Un bloc possède trois réplicas sur trois DataNodes différents. Un DataNode tombe en panne.",
    question: "Que permet immédiatement la réplication ?",
    options: [
      "Continuer à lire le bloc depuis un autre réplica disponible",
      "Recréer automatiquement le serveur physique défaillant",
      "Transformer le NameNode en DataNode",
      "Éviter toute utilisation du réseau"
    ],
    answer: 0,
    explanation: "Les autres copies rendent le bloc toujours disponible. HDFS pourra ensuite rétablir le niveau de réplication cible en créant une nouvelle copie ailleurs.",
    takeaway: "La réplication réduit l’impact d’une panne de DataNode sur la disponibilité des données.",
    image: "assets/replication.png"
  },
  {
    category: "Hadoop & HDFS",
    difficulty: "Raisonnement",
    scenario: "Un fichier est réparti sur plusieurs DataNodes, mais chaque bloc n’existe qu’en une seule copie.",
    question: "Quel risque reste important ?",
    options: [
      "Une panne d’un DataNode peut rendre certains blocs indisponibles",
      "Le NameNode stockera automatiquement tous les blocs à sa place",
      "Le fichier ne pourra pas être découpé",
      "La distribution empêchera tout traitement parallèle"
    ],
    answer: 0,
    explanation: "La distribution augmente capacité et parallélisme, mais sans réplication une panne du nœud qui détient l’unique copie d’un bloc peut rendre ce bloc indisponible.",
    takeaway: "Pour la tolérance aux pannes, la distribution seule ne suffit pas : il faut de la redondance.",
    image: "assets/replication.png"
  },
  {
    category: "NameNode & tolérance aux pannes",
    difficulty: "Application",
    scenario: "Le NameNode ne reçoit plus les heartbeats d’un DataNode pendant suffisamment longtemps.",
    question: "Quelle réaction est cohérente avec HDFS ?",
    options: [
      "Considérer le nœud indisponible et ne plus lui confier de nouvelles E/S",
      "Supprimer immédiatement tout le namespace HDFS",
      "Arrêter tous les autres DataNodes sains",
      "Convertir le DataNode en NameNode"
    ],
    answer: 0,
    explanation: "Les heartbeats servent à savoir quels DataNodes sont vivants. En cas d’indisponibilité, le NameNode cesse de les utiliser et peut déclencher une re-réplication si nécessaire.",
    takeaway: "Heartbeats = liveness ; block reports = inventaire des blocs.",
    image: "assets/fault_tolerance.png"
  },
  {
    category: "NameNode & tolérance aux pannes",
    difficulty: "Raisonnement",
    scenario: "Tous les réplicas d’un bloc sont placés dans le même rack. Le rack entier tombe en panne.",
    question: "Quelle décision d’architecture aurait mieux réduit ce risque ?",
    options: [
      "Placer les réplicas sur plusieurs racks",
      "Augmenter uniquement la taille du bloc",
      "Mettre le bloc sur le NameNode",
      "Désactiver les heartbeats"
    ],
    answer: 0,
    explanation: "Le rack awareness vise à distribuer intelligemment les copies pour qu’une panne de rack ne fasse pas disparaître toutes les copies d’un bloc.",
    takeaway: "La localisation des réplicas compte autant que leur nombre.",
    image: "assets/fault_tolerance.png"
  },
  {
    category: "NameNode & tolérance aux pannes",
    difficulty: "Compréhension",
    scenario: "Depuis le dernier checkpoint, de nombreuses opérations de namespace ont été effectuées.",
    question: "Quelle association décrit correctement les métadonnées persistantes ?",
    options: [
      "FsImage = état cohérent ; EditLog = modifications depuis cet état",
      "FsImage = blocs utilisateurs ; EditLog = copies de sauvegarde des fichiers",
      "FsImage = réseau ; EditLog = CPU",
      "FsImage et EditLog sont stockés uniquement dans chaque DataNode"
    ],
    answer: 0,
    explanation: "FsImage représente un état persistant du namespace. EditLog journalise les modifications intervenues depuis cette image. Lors d’un checkpoint, les edits sont rejoués et fusionnés.",
    takeaway: "FsImage et EditLog décrivent les métadonnées, pas le contenu des blocs.",
    image: "assets/ha.png"
  },
  {
    category: "NameNode & tolérance aux pannes",
    difficulty: "Identification d’erreur",
    scenario: "Un étudiant affirme : « Si le NameNode principal tombe, le Secondary NameNode prend automatiquement sa place. »",
    question: "Quelle correction est la plus juste ?",
    options: [
      "Il a raison dans toute architecture HDFS",
      "Le Secondary NameNode sert historiquement aux checkpoints ; il n’est pas le serveur de failover automatique",
      "Le Secondary NameNode stocke tous les blocs utilisateurs en double",
      "Le Secondary NameNode est simplement un autre nom pour un DataNode"
    ],
    answer: 1,
    explanation: "Le piège classique est de confondre Secondary NameNode et serveur de secours. En HDFS HA moderne, le rôle de relève est assuré par un Standby NameNode.",
    takeaway: "Secondary NameNode ≠ Standby NameNode.",
    image: "assets/ha.png"
  },
  {
    category: "NameNode & tolérance aux pannes",
    difficulty: "Architecture",
    scenario: "Une entreprise veut éviter qu’une panne du NameNode actif immobilise HDFS.",
    question: "Quelle architecture répond le mieux à cet objectif ?",
    options: [
      "Un NameNode Active + un Standby maintenu à jour, avec mécanisme de partage des edits",
      "Un seul NameNode plus puissant, sans redondance",
      "Un Secondary NameNode qui stocke les blocs utilisateur",
      "Uniquement plus de DataNodes"
    ],
    answer: 0,
    explanation: "La haute disponibilité HDFS repose sur un NameNode actif et un NameNode standby maintenu suffisamment à jour pour reprendre le service.",
    takeaway: "HA protège le rôle critique des métadonnées en ajoutant une relève synchronisée.",
    image: "assets/ha.png"
  },
  {
    category: "NameNode & tolérance aux pannes",
    difficulty: "Compréhension",
    scenario: "Dans une configuration HA utilisant QJM, plusieurs JournalNodes participent au partage des edits.",
    question: "Pourquoi en utiliser plusieurs ?",
    options: [
      "Pour former un quorum et éviter de dépendre d’un journal unique",
      "Pour remplacer tous les DataNodes",
      "Pour convertir les fichiers en base SQL",
      "Pour exécuter les commandes hdfs dfs côté client"
    ],
    answer: 0,
    explanation: "Avec QJM, plusieurs JournalNodes permettent au système de maintenir un journal partagé avec une logique de quorum, évitant un point unique de défaillance du journal.",
    takeaway: "HA des métadonnées = Active/Standby + synchronisation fiable des edits.",
    image: "assets/ha.png"
  },
  {
    category: "Lecture, écriture & locality",
    difficulty: "Ordonnancement",
    scenario: "Un client veut lire un fichier HDFS.",
    question: "Quel enchaînement est le plus cohérent ?",
    options: [
      "Client → NameNode pour les emplacements, puis Client → DataNodes pour les blocs",
      "Client → DataNodes au hasard, puis DataNodes → NameNode pour chaque octet",
      "Client → Secondary NameNode, puis aucun accès aux DataNodes",
      "Client → JournalNodes pour récupérer directement le fichier"
    ],
    answer: 0,
    explanation: "Le client récupère d’abord les métadonnées utiles auprès du NameNode, puis ouvre des flux directement vers les DataNodes qui hébergent les blocs.",
    takeaway: "Métadonnées via NameNode ; données via DataNodes.",
    image: "assets/read_path.png"
  },
  {
    category: "Lecture, écriture & locality",
    difficulty: "Raisonnement",
    scenario: "Un même bloc existe sur trois DataNodes : un local au nœud de calcul, un dans le même rack et un dans un rack distant.",
    question: "Quel réplica devrait être privilégié ?",
    options: [
      "Le réplica local au nœud de calcul",
      "Toujours le réplica du rack le plus distant",
      "Le NameNode doit d’abord recopier le bloc dans sa propre mémoire",
      "Le choix est forcément aléatoire"
    ],
    answer: 0,
    explanation: "HDFS privilégie la proximité : local si possible, puis proche dans la topologie. Cela réduit le trafic réseau et améliore le débit utile.",
    takeaway: "Moins de distance réseau = moins de coût de transfert.",
    image: "assets/locality.png"
  },
  {
    category: "Lecture, écriture & locality",
    difficulty: "Ordonnancement",
    scenario: "Un client écrit un nouveau bloc avec un facteur de réplication supérieur à 1.",
    question: "Quel chemin correspond le mieux au pipeline d’écriture HDFS ?",
    options: [
      "Le NameNode choisit les cibles, puis le client envoie au premier DataNode qui relaie vers les suivants",
      "Le client envoie tout le fichier au NameNode, qui le redistribue octet par octet",
      "Les JournalNodes stockent directement les blocs utilisateurs",
      "Le client écrit uniquement sur son disque local"
    ],
    answer: 0,
    explanation: "Le NameNode coordonne les métadonnées et choisit les cibles. Les paquets de données circulent ensuite dans un pipeline de DataNodes.",
    takeaway: "En écriture aussi, le NameNode coordonne sans transporter le flux principal des données.",
    image: "assets/read_path.png"
  },
  {
    category: "Lecture, écriture & locality",
    difficulty: "Résilience",
    scenario: "Pendant une écriture, le deuxième DataNode du pipeline tombe en panne avant d’acquitter certains paquets.",
    question: "Quelle réaction est la plus cohérente ?",
    options: [
      "Reconfigurer le pipeline et poursuivre, puis restaurer la réplication cible",
      "Déclarer tout HDFS définitivement perdu",
      "Envoyer les paquets uniquement au NameNode",
      "Désactiver la réplication pour terminer plus vite"
    ],
    answer: 0,
    explanation: "Les paquets non acquittés restent connus du client. Le pipeline peut être reconfiguré, et HDFS restaure ensuite le niveau de réplication cible.",
    takeaway: "La fiabilité vient du protocole + réplication, pas d’un matériel supposé infaillible.",
    image: "assets/fault_tolerance.png"
  },
  {
    category: "Lecture, écriture & locality",
    difficulty: "Mise en situation",
    scenario: "Un bloc de 4 Go est déjà sur N3. Le programme de filtrage à exécuter fait seulement 200 Ko.",
    question: "Quelle stratégie illustre le mieux la data locality ?",
    options: [
      "Déplacer les 4 Go vers la machine qui possède le programme",
      "Déplacer les 200 Ko de code vers N3 et traiter les données sur place",
      "Copier le bloc sur le NameNode puis calculer",
      "Envoyer le bloc à tous les nœuds avant de commencer"
    ],
    answer: 1,
    explanation: "Le coût de déplacer 200 Ko de code est très inférieur au coût de transférer 4 Go de données. Hadoop cherche donc à rapprocher le calcul des données.",
    takeaway: "Data locality : déplacer le calcul est souvent beaucoup moins coûteux que déplacer les données.",
    image: "assets/locality.png"
  },
  {
    category: "Lecture, écriture & locality",
    difficulty: "Raisonnement",
    scenario: "Deux plans exécutent le même calcul. Plan A transfère 800 Go sur le réseau. Plan B exécute la tâche près des blocs et ne transfère que 3 Go de résultats.",
    question: "Pourquoi le plan B peut-il être préférable ?",
    options: [
      "Il économise la bande passante réseau et peut améliorer le débit global",
      "Il supprime automatiquement la nécessité d’HDFS",
      "Il garantit un temps de réponse de quelques millisecondes",
      "Il rend la réplication inutile"
    ],
    answer: 0,
    explanation: "La data locality considère le réseau comme une ressource coûteuse. Réduire les transferts massifs permet souvent d’améliorer le débit global du cluster.",
    takeaway: "Le réseau doit être économisé comme le CPU, la RAM et les E/S disque.",
    image: "assets/locality.png"
  },
  {
    category: "Configuration & commandes",
    difficulty: "Choix d’environnement",
    scenario: "Un étudiant veut apprendre HDFS sur un seul ordinateur en lançant plusieurs daemons/JVMs, avec un vrai HDFS localement.",
    question: "Quel mode Hadoop correspond le mieux ?",
    options: [
      "Pseudo-distribué",
      "Totalement distribué sur plusieurs machines physiques",
      "Local/standalone sans HDFS",
      "Mode transactionnel SQL"
    ],
    answer: 0,
    explanation: "Le mode pseudo-distribué utilise une seule machine mais plusieurs daemons/JVMs et peut utiliser HDFS. C’est adapté à l’apprentissage.",
    takeaway: "Standalone = tests simples ; pseudo-distribué = apprentissage sur une machine ; distribué = plusieurs machines.",
    image: "assets/cluster.png"
  },
  {
    category: "Configuration & commandes",
    difficulty: "Compréhension",
    scenario: "Un client exécute des commandes HDFS sans préciser explicitement une URI à chaque fois.",
    question: "Quel paramètre de core-site.xml lui indique le système de fichiers par défaut ?",
    options: [
      "fs.defaultFS",
      "dfs.replication",
      "mapreduce.reducers",
      "yarn.nodemanager.memory"
    ],
    answer: 0,
    explanation: "fs.defaultFS définit l’URI du système de fichiers par défaut. Le nom d’hôte et le port dépendent de l’environnement ou de l’image Docker utilisée.",
    takeaway: "core-site.xml répond notamment à : « quel système de fichiers le client utilise-t-il par défaut ? »",
    image: "assets/hdfs_storage.png"
  },
  {
    category: "Configuration & commandes",
    difficulty: "Raisonnement",
    scenario: "Dans hdfs-site.xml, dfs.replication vaut 3, mais le laboratoire ne dispose que de deux DataNodes actifs.",
    question: "Quelle analyse est la plus juste ?",
    options: [
      "La cible de trois réplicas ne peut pas être pleinement satisfaite avec seulement deux DataNodes actifs",
      "HDFS créera automatiquement un troisième DataNode virtuel sans configuration",
      "Le fichier sera obligatoirement découpé en trois blocs",
      "dfs.replication contrôle le nombre de NameNodes"
    ],
    answer: 0,
    explanation: "Le facteur de réplication est une cible de copies. En environnement pédagogique avec peu de DataNodes, on le réduit souvent pour rester compatible avec le nombre de nœuds disponibles.",
    takeaway: "Facteur de réplication = nombre de copies visées par bloc, pas nombre de blocs.",
    image: "assets/replication.png"
  },
  {
    category: "Configuration & commandes",
    difficulty: "Application",
    scenario: "Vous voulez créer /data/logs puis transférer le fichier local logs.txt vers ce répertoire HDFS.",
    question: "Quelle séquence est correcte ?",
    options: [
      "hdfs dfs -mkdir -p /data/logs puis hdfs dfs -put logs.txt /data/logs/",
      "hdfs dfs -get logs.txt /data/logs/ puis hdfs dfs -mkdir logs.txt",
      "hdfs dfs -rm /data/logs puis hdfs dfs -cat logs.txt",
      "docker cp logs.txt /data/logs puis hdfs dfs -tail /"
    ],
    answer: 0,
    explanation: "-mkdir -p crée le répertoire HDFS (et ses parents si besoin). -put copie ensuite le fichier depuis le système local vers HDFS.",
    takeaway: "Attention au sens : -put = local → HDFS ; -get = HDFS → local.",
    image: "assets/hdfs_storage.png"
  },
  {
    category: "Configuration & commandes",
    difficulty: "Choix d’outil",
    scenario: "Un fichier HDFS fait plusieurs dizaines de gigaoctets. Vous voulez seulement vérifier sa fin sans afficher tout son contenu.",
    question: "Quelle commande est la plus adaptée parmi ces choix ?",
    options: [
      "hdfs dfs -tail /chemin/fichier",
      "hdfs dfs -cat /chemin/fichier",
      "hdfs dfs -rm -r /chemin/fichier",
      "hdfs dfs -setrep -w 3 /chemin/fichier"
    ],
    answer: 0,
    explanation: "-tail affiche la fin du fichier et évite de dérouler l’intégralité d’un très gros fichier. -cat est déconseillé pour un fichier volumineux.",
    takeaway: "Choisissez la commande selon l’objectif : lire tout, lire la fin, mesurer, copier ou supprimer.",
    image: "assets/hdfs_storage.png"
  },
  {
    category: "Configuration & commandes",
    difficulty: "Application",
    scenario: "Vous voulez demander trois réplicas pour ventes.csv et attendre que l’opération soit effectivement terminée.",
    question: "Quelle commande correspond à cette intention ?",
    options: [
      "hdfs dfs -setrep -w 3 /user/etudiant/ventes.csv",
      "hdfs dfs -chmod 3 /user/etudiant/ventes.csv",
      "hdfs dfs -count 3 /user/etudiant/ventes.csv",
      "hdfs dfs -mv 3 /user/etudiant/ventes.csv"
    ],
    answer: 0,
    explanation: "-setrep modifie le facteur de réplication demandé ; l’option -w attend que la réplication atteigne la cible.",
    takeaway: "Les permissions et la réplication sont deux notions différentes : chmod ≠ setrep.",
    image: "assets/replication.png"
  }
];

const categoryGuidance = {
  "Penser distribué": "Revoir scale-up/scale-out, parallélisation, réseau et tolérance aux pannes.",
  "Hadoop & HDFS": "Revoir le profil d’usage de HDFS, blocs, distribution et réplication.",
  "NameNode & tolérance aux pannes": "Revoir métadonnées, heartbeats, FsImage/EditLog, Secondary NameNode et HA.",
  "Lecture, écriture & locality": "Revoir les chemins lecture/écriture, les réplicas proches et la data locality.",
  "Configuration & commandes": "Revoir les modes Hadoop, core-site.xml, hdfs-site.xml et les commandes HDFS de base."
};

const state = {
  quizQuestions: [...questions],
  index: 0,
  selected: null,
  locked: false,
  responses: [],
  reviewMode: false
};

const el = id => document.getElementById(id);
const screens = {
  start: el("screen-start"),
  quiz: el("screen-quiz"),
  results: el("screen-results")
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, node]) => node.classList.toggle("active", key === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz(questionSet = questions, reviewMode = false) {
  state.quizQuestions = [...questionSet];
  state.index = 0;
  state.selected = null;
  state.locked = false;
  state.responses = [];
  state.reviewMode = reviewMode;
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = state.quizQuestions[state.index];
  state.selected = null;
  state.locked = false;

  const total = state.quizQuestions.length;
  const displayIndex = state.index + 1;
  const pct = Math.round((displayIndex / total) * 100);

  el("question-counter").textContent = state.reviewMode
    ? `Révision ciblée ${displayIndex} / ${total}`
    : `Question ${displayIndex} / ${total}`;
  el("progress-percent").textContent = `${pct} %`;
  el("progress-fill").style.width = `${pct}%`;
  el("progress-fill").parentElement.setAttribute("aria-valuenow", pct);

  el("category-chip").textContent = q.category;
  el("difficulty-chip").textContent = q.difficulty;
  el("scenario").textContent = q.scenario || "";
  el("question-text").textContent = q.question;

  const answers = el("answers");
  answers.innerHTML = "";
  const letters = ["A", "B", "C", "D", "E"];
  q.options.forEach((option, idx) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", "false");
    button.innerHTML = `<span class="answer-letter">${letters[idx]}</span><span>${option}</span>`;
    button.addEventListener("click", () => selectAnswer(idx));
    answers.appendChild(button);
  });

  const visual = el("question-visual");
  if (q.image) {
    visual.classList.remove("no-image");
    el("question-image").src = q.image;
  } else {
    visual.classList.add("no-image");
    el("question-image").src = "";
  }

  el("validate-btn").disabled = true;
  el("validate-btn").classList.remove("hidden");
  el("next-btn").classList.add("hidden");
  el("feedback").className = "feedback hidden";
}

function selectAnswer(idx) {
  if (state.locked) return;
  state.selected = idx;
  [...el("answers").children].forEach((button, i) => {
    button.classList.toggle("selected", i === idx);
    button.setAttribute("aria-checked", i === idx ? "true" : "false");
  });
  el("validate-btn").disabled = false;
}

function validateAnswer() {
  if (state.selected === null || state.locked) return;
  state.locked = true;
  const q = state.quizQuestions[state.index];
  const correct = state.selected === q.answer;

  [...el("answers").children].forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add("correct");
    if (i === state.selected && !correct) button.classList.add("wrong");
  });

  state.responses.push({ question: q, selected: state.selected, correct });

  const feedback = el("feedback");
  feedback.className = `feedback ${correct ? "success" : "error"}`;
  el("feedback-icon").textContent = correct ? "✓" : "↺";
  el("feedback-title").textContent = correct ? "Bonne réponse" : "À corriger";
  el("feedback-explanation").textContent = q.explanation;
  el("feedback-takeaway").textContent = q.takeaway;
  feedback.focus({ preventScroll: true });

  el("validate-btn").classList.add("hidden");
  el("next-btn").classList.remove("hidden");
  el("next-btn").textContent = state.index === state.quizQuestions.length - 1 ? "Voir mon bilan" : "Question suivante";
}

function nextQuestion() {
  if (state.index < state.quizQuestions.length - 1) {
    state.index += 1;
    renderQuestion();
    document.querySelector(".quiz-topbar").scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    showResults();
  }
}

function showResults() {
  showScreen("results");
  const total = state.responses.length;
  const correct = state.responses.filter(r => r.correct).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  el("score-percent").textContent = `${pct}%`;
  el("score-raw").textContent = `${correct} / ${total}`;
  el("score-ring").style.setProperty("--score", `${pct * 3.6}deg`);

  let message;
  if (pct >= 90) message = "Excellente maîtrise. Vous raisonnez correctement sur les mécanismes distribués et HDFS. Vous pouvez aborder la suite avec une base très solide.";
  else if (pct >= 75) message = "Bonne maîtrise globale. Quelques distinctions techniques méritent encore une révision ciblée avant de poursuivre.";
  else if (pct >= 60) message = "Les idées principales sont présentes, mais plusieurs mécanismes doivent être consolidés. Utilisez le bilan par notion pour cibler votre révision.";
  else message = "Les bases demandent encore du travail. Reprenez les notions signalées, puis refaites uniquement les questions manquées avant de recommencer le quiz complet.";
  el("result-message").textContent = message;

  const byCategory = {};
  state.responses.forEach(r => {
    byCategory[r.question.category] ??= { correct: 0, total: 0 };
    byCategory[r.question.category].total += 1;
    if (r.correct) byCategory[r.question.category].correct += 1;
  });

  const results = el("category-results");
  results.innerHTML = "";
  Object.entries(byCategory).forEach(([category, value]) => {
    const p = Math.round((value.correct / value.total) * 100);
    const row = document.createElement("div");
    row.className = "category-result";
    row.innerHTML = `
      <div class="category-result-head"><strong>${category}</strong><span>${value.correct}/${value.total} · ${p}%</span></div>
      <div class="category-bar"><span style="width:${p}%"></span></div>`;
    results.appendChild(row);
  });

  const advice = el("revision-advice");
  advice.innerHTML = "";
  const ranked = Object.entries(byCategory)
    .map(([category, value]) => ({ category, pct: Math.round((value.correct / value.total) * 100) }))
    .sort((a, b) => a.pct - b.pct);

  const weak = ranked.filter(x => x.pct < 75);
  if (!weak.length) {
    advice.innerHTML = `<p><strong>Aucune faiblesse majeure détectée.</strong></p><p>Pour aller plus loin, reformulez à voix haute le chemin de lecture HDFS, le rôle du NameNode et le principe de data locality sans regarder le support.</p>`;
  } else {
    weak.slice(0, 3).forEach(item => {
      const div = document.createElement("div");
      div.className = "advice-item";
      div.innerHTML = `<strong>${item.category} — ${item.pct}%</strong><p>${categoryGuidance[item.category]}</p>`;
      advice.appendChild(div);
    });
  }

  const errors = state.responses.filter(r => !r.correct).map(r => r.question);
  el("retry-errors-btn").disabled = errors.length === 0;
  el("retry-errors-btn").onclick = () => startQuiz(errors, true);
}

el("start-btn").addEventListener("click", () => startQuiz());
el("validate-btn").addEventListener("click", validateAnswer);
el("next-btn").addEventListener("click", nextQuestion);
el("restart-btn").addEventListener("click", () => startQuiz());

document.addEventListener("keydown", event => {
  if (!screens.quiz.classList.contains("active")) return;
  if (!state.locked && ["1","2","3","4"].includes(event.key)) {
    const idx = Number(event.key) - 1;
    const q = state.quizQuestions[state.index];
    if (idx < q.options.length) selectAnswer(idx);
  }
  if (event.key === "Enter") {
    if (!state.locked && state.selected !== null) validateAnswer();
    else if (state.locked) nextQuestion();
  }
});
