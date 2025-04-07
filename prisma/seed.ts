import { faker } from "@faker-js/faker/locale/fr";
import {
  Gender,
  MaritalStatus,
  MemberStatus,
  NoteType,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Début de la génération des données de test...");

  // ID de l'église fixe
  const churchId = "cd886226-6029-4603-ab1c-3af7d3f26678";

  // ID utilisateur pour les notes  pnpm add -D @faker-js/faker  pnpm add -D @faker-js/faker  pnpm add -D @faker-js/faker  pnpm add -D @faker-js/faker
  const userId = faker.string.uuid();

  // Supprimer les données existantes
  console.log("Suppression des données existantes...");
  await prisma.notes.deleteMany();
  await prisma.member.deleteMany();

  console.log("Création des 800 membres...");

  // Préparation des données des membres en batch
  const membres = [];
  const statuses = Object.values(MemberStatus);
  const maritalStatuses = Object.values(MaritalStatus);
  const genders = Object.values(Gender);
  const departments = [
    "Impact Louange",
    "Coordination générale",
    "Accueil",
    "Multimédia",
    "Sainte cène",
    "Déploiement des STAR",
    "Secrétariat général",
    "Juridique",
    "Point information",
    "Activités récréatives",
    "Bureau des EdM",
    "Supervision des missionnaires",
    "Impact sans frontières",
    "Jeunesse",
    "Enfance",
    "Administration",
    "Enseignement",
    "Prière",
    "Technique",
    "Communication",
    "Évangélisation",
    "Média",
    "Ménage",
    "Compassion",
    "Hospitalité",
  ];

  // Génération de 800 membres
  for (let i = 0; i < 800; i++) {
    const gender = faker.helpers.arrayElement(genders);
    const firstname =
      gender === Gender.MALE
        ? faker.person.firstName("male")
        : faker.person.firstName("female");
    const lastname = faker.person.lastName().toUpperCase();

    // Sélection aléatoire de 1 à 3 départements
    const memberDepartments = faker.helpers.arrayElements(
      departments,
      faker.number.int({ min: 1, max: 3 })
    );

    membres.push({
      firstname,
      lastname,
      fullname: `${firstname} ${lastname}`,
      maritalStatus: faker.helpers.arrayElement(maritalStatuses),
      email: faker.internet
        .email({ firstName: firstname, lastName: lastname })
        .toLowerCase(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: "age" }),
      gender,
      address: faker.location.streetAddress({ useFullAddress: true }),
      status: faker.helpers.arrayElement(statuses),
      phone: faker.phone.number({
        style: "international",
      }),
      churchId,
      departments: memberDepartments,
    });

    if ((i + 1) % 100 === 0) {
      console.log(`${i + 1} membres préparés...`);
    }
  }

  // Création des membres en batch (par lots de 50)
  const batchSize = 50;
  for (let i = 0; i < membres.length; i += batchSize) {
    const batch = membres.slice(i, i + batchSize);
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      batch.map(async (membre) => prisma.member.create({ data: membre }))
    );
    console.log(
      `Lot de membres ${i + 1} à ${Math.min(i + batchSize, membres.length)} créé`
    );
  }

  // Récupération des membres créés
  console.log("Récupération des membres pour créer les notes...");
  const membresCreated = await prisma.member.findMany({
    select: { id: true, fullname: true },
  });

  console.log("Création des 2000 notes...");

  // Types de notes et raisons communes
  const noteTypes = Object.values(NoteType);
  const noteReasons = {
    [NoteType.INTERVIEW]: [
      "Entretien d'intégration",
      "Entretien pastoral",
      "Évaluation de service",
      "Rencontre initiale",
      "Discussion de suivi",
      "Bilan personnel",
    ],
    [NoteType.ADVICE]: [
      "Conseil spirituel",
      "Orientation ministérielle",
      "Guidance personnelle",
      "Accompagnement familial",
      "Conseils relationnels",
      "Direction de vie",
    ],
    [NoteType.PRAYER]: [
      "Besoin spirituel",
      "Intercession familiale",
      "Soutien dans l'épreuve",
      "Requête de guérison",
      "Discernement",
      "Croissance spirituelle",
    ],
    [NoteType.FOLLOW_UP]: [
      "Suivi pastoral",
      "Accompagnement spirituel",
      "Développement des compétences",
      "Progression ministérielle",
      "Vérification de bien-être",
      "Continuité de formation",
    ],
    [NoteType.INTEGRATION]: [
      "Bilan d'intégration",
      "Suivi d'intégration",
      "Processus d'accueil",
      "Adaptation communautaire",
      "Incorporation au ministère",
      "Phase d'inclusion",
    ],
    [NoteType.LEAVING]: [
      "Départ pour déménagement",
      "Changement d'assemblée",
      "Pause temporaire",
      "Résolution de conflit",
      "Réorientation spirituelle",
      "Transition de vie",
    ],
    [NoteType.CLINICAL]: [
      "Réunion pastorale",
      "Soutien psychologique",
      "Accompagnement thérapeutique",
      "Assistance en crise",
      "Intervention spécialisée",
      "Consultation d'aide",
    ],
  };

  // Contenu commun pour chaque type de note
  const noteContentTemplates = {
    [NoteType.INTERVIEW]: [
      "Rencontre avec le membre pour discuter de son parcours spirituel et de ses attentes au sein de l'église.",
      "Discussion sur l'implication potentielle dans les ministères selon les dons et talents identifiés.",
      "Évaluation de l'adaptation du membre à la communauté et de ses besoins d'accompagnement.",
      "Entretien pour comprendre les aspirations spirituelles et les domaines de croissance souhaités.",
    ],
    [NoteType.ADVICE]: [
      "Conseils donnés concernant la gestion des priorités entre engagement d'église et vie familiale.",
      "Guidance sur les étapes à suivre pour développer un ministère personnel aligné avec sa vision.",
      "Recommandations pour approfondir sa connaissance biblique et sa vie de prière.",
      "Orientation vers des ressources et formations adaptées à son cheminement spirituel.",
    ],
    [NoteType.PRAYER]: [
      "Temps de prière pour des défis professionnels et des décisions importantes à prendre.",
      "Intercession pour la guérison physique et le rétablissement complet après une période de maladie.",
      "Prière pour la restauration de relations familiales tendues et la réconciliation.",
      "Moment de prière pour la direction divine concernant des choix de vie majeurs.",
    ],
    [NoteType.FOLLOW_UP]: [
      "Suivi des progrès dans l'intégration au sein du département choisi et ajustements nécessaires.",
      "Vérification de l'engagement et identification des obstacles potentiels à la participation régulière.",
      "Évaluation du bien-être spirituel et émotionnel suite aux récents événements personnels.",
      "Point sur le développement des compétences ministérielles et les prochaines étapes de croissance.",
    ],
    [NoteType.INTEGRATION]: [
      "Le membre s'intègre bien dans le département et commence à établir des relations significatives.",
      "Progrès notable dans la compréhension de la vision de l'église et adhésion aux valeurs communautaires.",
      "Identification des domaines où un soutien supplémentaire pourrait faciliter une meilleure intégration.",
      "Évaluation positive de la participation aux activités d'église et aux moments de communion fraternelle.",
    ],
    [NoteType.LEAVING]: [
      "Discussion sur les raisons du départ et clarification des malentendus éventuels.",
      "Planification d'une transition harmonieuse et identification d'une nouvelle communauté d'accueil potentielle.",
      "Expression de la volonté de maintenir le contact et de continuer à soutenir spirituellement malgré le départ.",
      "Réflexion sur l'expérience vécue au sein de l'église et les apprentissages à emporter.",
    ],
    [NoteType.CLINICAL]: [
      "Accompagnement pastoral spécifique pour traverser une période de deuil significatif.",
      "Soutien face à des défis de santé mentale en collaboration avec des professionnels qualifiés.",
      "Intervention en situation de crise familiale nécessitant une approche pastorale spécialisée.",
      "Discussion sur des questions théologiques profondes et leur application dans des circonstances difficiles.",
    ],
  };

  // Génération de 2000 notes
  const notes = [];
  for (let i = 0; i < 2000; i++) {
    // Sélectionner un membre au hasard
    const member = faker.helpers.arrayElement(membresCreated);

    // Sélectionner un type de note au hasard
    const noteType = faker.helpers.arrayElement(noteTypes);

    // Sélectionner une raison correspondant au type de note
    const reason = faker.helpers.arrayElement(noteReasons[noteType]);

    // Sélectionner un contenu de base correspondant au type
    const baseContent = faker.helpers.arrayElement(
      noteContentTemplates[noteType]
    );

    // Ajouter des détails personnalisés au contenu
    const additionalDetails = faker.lorem.paragraph();
    const content = `${baseContent} ${additionalDetails}`;

    // Date de la note (entre aujourd'hui et il y a 2 ans)
    const noteDate = faker.date.between({
      from: new Date(2023, 3, 7), // 7 avril 2023
      to: new Date(2025, 3, 7), // 7 avril 2025 (aujourd'hui)
    });

    notes.push({
      type: noteType,
      content,
      reason,
      noteDate,
      memberId: member.id,
      memberFullname: member.fullname,
      churchId,
      userId,
    });

    if ((i + 1) % 200 === 0) {
      console.log(`${i + 1} notes préparées...`);
    }
  }

  // Création des notes en batch (par lots de 100)
  const noteBatchSize = 100;
  for (let i = 0; i < notes.length; i += noteBatchSize) {
    const batch = notes.slice(i, i + noteBatchSize);
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(
      batch.map(async (note) => prisma.notes.create({ data: note }))
    );
    console.log(
      `Lot de notes ${i + 1} à ${Math.min(i + noteBatchSize, notes.length)} créé`
    );
  }

  console.log("Données de test créées avec succès !");
  console.log(
    `✅ ${membres.length} membres et ${notes.length} notes ont été créés.`
  );
}

main()
  .catch((e) => {
    console.error("Erreur lors de la génération des données:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
