// classes/classes.js - Main class data structure
// This file contains the structure and sample questions for all classes

window.classesData = {
    '9': {
        subjects: ['math', 'physics', 'chemistry', 'biology'],
        chapters: {
            math: [
                { 
                    name: 'Number Systems', 
                    sets: [
                        [
                            { question: "Which of the following is a rational number?", options: ["π", "√2", "3/4", "√5"], answer: 2 },
                            { question: "The decimal expansion of 7/8 is:", options: ["0.875", "0.857", "0.785", "0.758"], answer: 0 },
                            { question: "Which is an irrational number?", options: ["0.5", "√9", "√7", "2/3"], answer: 2 },
                            { question: "The value of (3²)³ is:", options: ["27", "81", "243", "729"], answer: 3 },
                            { question: "√144 equals:", options: ["11", "12", "13", "14"], answer: 1 }
                        ],
                        [], [], [], [] // Sets 2-5 to be added
                    ]
                },
                { 
                    name: 'Polynomials', 
                    sets: [
                        [
                            { question: "The degree of polynomial 5x³ + 2x² - 7 is:", options: ["2", "3", "5", "7"], answer: 1 },
                            { question: "If p(x) = x² + 2x + 1, then p(1) is:", options: ["1", "2", "3", "4"], answer: 3 },
                            { question: "The zero of polynomial 2x - 4 is:", options: ["2", "-2", "4", "-4"], answer: 0 },
                            { question: "Which is a linear polynomial?", options: ["x²", "3x + 5", "x³", "5"], answer: 1 },
                            { question: "The constant term in 3x² - 5x + 7 is:", options: ["3", "-5", "7", "0"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Coordinate Geometry', 
                    sets: [
                        [
                            { question: "The point (0, 5) lies on:", options: ["x-axis", "y-axis", "origin", "quadrant I"], answer: 1 },
                            { question: "Distance between (0,0) and (3,4) is:", options: ["5", "7", "12", "25"], answer: 0 },
                            { question: "In which quadrant does (-2, 3) lie?", options: ["I", "II", "III", "IV"], answer: 1 },
                            { question: "The x-coordinate of a point on y-axis is:", options: ["1", "-1", "0", "any value"], answer: 2 },
                            { question: "Midpoint of (2,4) and (6,8) is:", options: ["(4,6)", "(8,12)", "(2,2)", "(4,4)"], answer: 0 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            physics: [
                { 
                    name: 'Motion', 
                    sets: [
                        [
                            { question: "Speed is a:", options: ["vector quantity", "scalar quantity", "dimensionless quantity", "base quantity"], answer: 1 },
                            { question: "The SI unit of velocity is:", options: ["m/s", "km/h", "cm/s", "m/min"], answer: 0 },
                            { question: "Acceleration is the rate of change of:", options: ["distance", "displacement", "velocity", "speed"], answer: 2 },
                            { question: "For uniform motion, acceleration is:", options: ["maximum", "minimum", "zero", "negative"], answer: 2 },
                            { question: "Distance-time graph for uniform motion is:", options: ["curved line", "straight line", "circle", "parabola"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Force and Laws of Motion', 
                    sets: [
                        [
                            { question: "Newton's first law is also called:", options: ["Law of momentum", "Law of inertia", "Law of acceleration", "Law of action"], answer: 1 },
                            { question: "The SI unit of force is:", options: ["Pascal", "Newton", "Joule", "Watt"], answer: 1 },
                            { question: "Mass × acceleration equals:", options: ["momentum", "force", "velocity", "energy"], answer: 1 },
                            { question: "Inertia depends on:", options: ["velocity", "acceleration", "mass", "force"], answer: 2 },
                            { question: "Action and reaction forces are:", options: ["equal and same direction", "unequal and opposite", "equal and opposite", "unequal and same"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Gravitation', 
                    sets: [
                        [
                            { question: "The value of g on Earth is approximately:", options: ["9.8 m/s²", "10 m/s²", "8.9 m/s²", "11 m/s²"], answer: 0 },
                            { question: "Weight of an object on moon is _____ of its weight on Earth:", options: ["1/2", "1/4", "1/6", "1/8"], answer: 2 },
                            { question: "Universal gravitational constant G was measured by:", options: ["Newton", "Galileo", "Cavendish", "Einstein"], answer: 2 },
                            { question: "Gravitational force is a:", options: ["contact force", "non-contact force", "magnetic force", "electric force"], answer: 1 },
                            { question: "The acceleration due to gravity is:", options: ["same for all objects", "different for different masses", "zero in space", "maximum at poles"], answer: 0 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            chemistry: [
                { 
                    name: 'Matter in Our Surroundings', 
                    sets: [
                        [
                            { question: "Which state of matter has definite volume but no definite shape?", options: ["Solid", "Liquid", "Gas", "Plasma"], answer: 1 },
                            { question: "Sublimation is the process of:", options: ["solid to liquid", "liquid to gas", "solid to gas", "gas to liquid"], answer: 2 },
                            { question: "The temperature at which liquid changes to gas is called:", options: ["melting point", "boiling point", "freezing point", "sublimation point"], answer: 1 },
                            { question: "Particles in solids:", options: ["move freely", "vibrate in fixed positions", "have no motion", "move in all directions"], answer: 1 },
                            { question: "Evaporation causes:", options: ["heating", "cooling", "no change", "freezing"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Atoms and Molecules', 
                    sets: [
                        [
                            { question: "The smallest unit of matter is:", options: ["molecule", "atom", "element", "compound"], answer: 1 },
                            { question: "H₂O represents:", options: ["2 atoms of hydrogen and oxygen", "2 molecules of water", "1 molecule of water", "1 atom of water"], answer: 2 },
                            { question: "Atomicity of oxygen gas (O₂) is:", options: ["1", "2", "3", "4"], answer: 1 },
                            { question: "The symbol of sodium is:", options: ["S", "So", "Na", "N"], answer: 2 },
                            { question: "Molecular mass of CO₂ is:", options: ["28", "44", "32", "16"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Structure of Atom', 
                    sets: [
                        [
                            { question: "Electrons were discovered by:", options: ["Rutherford", "Thomson", "Dalton", "Bohr"], answer: 1 },
                            { question: "The charge of an electron is:", options: ["positive", "negative", "neutral", "variable"], answer: 1 },
                            { question: "Nucleus was discovered by:", options: ["Thomson", "Rutherford", "Dalton", "Bohr"], answer: 1 },
                            { question: "Atomic number represents number of:", options: ["neutrons", "protons", "electrons", "nucleons"], answer: 1 },
                            { question: "Mass number is sum of:", options: ["protons and electrons", "neutrons and electrons", "protons and neutrons", "all particles"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            biology: [
                { 
                    name: 'The Fundamental Unit of Life', 
                    sets: [
                        [
                            { question: "The basic unit of life is:", options: ["tissue", "organ", "cell", "organism"], answer: 2 },
                            { question: "Cell wall is present in:", options: ["animal cells only", "plant cells only", "both", "neither"], answer: 1 },
                            { question: "The powerhouse of the cell is:", options: ["nucleus", "mitochondria", "ribosome", "chloroplast"], answer: 1 },
                            { question: "Chloroplasts are found in:", options: ["animal cells", "plant cells", "both", "bacteria"], answer: 1 },
                            { question: "The control center of the cell is:", options: ["cytoplasm", "nucleus", "cell membrane", "vacuole"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Tissues', 
                    sets: [
                        [
                            { question: "A group of similar cells performing same function is called:", options: ["organ", "tissue", "system", "organism"], answer: 1 },
                            { question: "Xylem and phloem are examples of:", options: ["simple tissues", "complex tissues", "animal tissues", "meristematic tissues"], answer: 1 },
                            { question: "Parenchyma is a type of:", options: ["complex tissue", "simple tissue", "animal tissue", "reproductive tissue"], answer: 1 },
                            { question: "Blood is a type of:", options: ["epithelial tissue", "connective tissue", "nervous tissue", "muscular tissue"], answer: 1 },
                            { question: "Meristematic tissue is responsible for:", options: ["protection", "storage", "growth", "transport"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Diversity in Living Organisms', 
                    sets: [
                        [
                            { question: "The broadest category in classification is:", options: ["genus", "family", "phylum", "kingdom"], answer: 3 },
                            { question: "Binomial nomenclature was given by:", options: ["Darwin", "Linnaeus", "Mendel", "Watson"], answer: 1 },
                            { question: "Fungi are:", options: ["autotrophs", "heterotrophs", "both", "neither"], answer: 1 },
                            { question: "Animals without backbone are called:", options: ["vertebrates", "invertebrates", "mammals", "reptiles"], answer: 1 },
                            { question: "Algae belong to kingdom:", options: ["Plantae", "Animalia", "Protista", "Fungi"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                }
            ]
        }
    },
    '10': {
        subjects: ['math', 'physics', 'chemistry', 'biology'],
        chapters: {
            math: [
                { 
                    name: 'Real Numbers', 
                    sets: [
                        [
                            { question: "The decimal expansion of a rational number is either:", options: ["terminating", "non-terminating recurring", "both a and b", "infinite"], answer: 2 },
                            { question: "√2 is:", options: ["rational", "irrational", "integer", "whole number"], answer: 1 },
                            { question: "The HCF of 18 and 24 is:", options: ["4", "6", "8", "12"], answer: 1 },
                            { question: "Euclid's division lemma states a = bq + r, where:", options: ["0 ≤ r < b", "0 < r ≤ b", "r < 0", "r > b"], answer: 0 },
                            { question: "The LCM of 12 and 18 is:", options: ["30", "36", "42", "48"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Quadratic Equations', 
                    sets: [
                        [
                            { question: "The general form of quadratic equation is:", options: ["ax + b = 0", "ax² + bx + c = 0", "ax² + c = 0", "ax³ + bx² + c = 0"], answer: 1 },
                            { question: "The discriminant of ax² + bx + c = 0 is:", options: ["b² + 4ac", "b² - 4ac", "4ac - b²", "-b² + 4ac"], answer: 1 },
                            { question: "If discriminant = 0, the roots are:", options: ["real and distinct", "real and equal", "not real", "infinite"], answer: 1 },
                            { question: "The roots of x² - 5x + 6 = 0 are:", options: ["2, 3", "1, 6", "-2, -3", "5, 1"], answer: 0 },
                            { question: "The sum of roots of ax² + bx + c = 0 is:", options: ["b/a", "-b/a", "c/a", "-c/a"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Arithmetic Progressions', 
                    sets: [
                        [
                            { question: "In an AP, if a = 5 and d = 3, then a₅ is:", options: ["17", "20", "14", "11"], answer: 0 },
                            { question: "The nth term of an AP is given by:", options: ["a + nd", "a + (n-1)d", "a + (n+1)d", "nd"], answer: 1 },
                            { question: "The common difference of AP 7, 10, 13, 16... is:", options: ["3", "7", "10", "4"], answer: 0 },
                            { question: "Sum of first n terms of AP is:", options: ["n/2[2a + (n-1)d]", "n/2[2a + nd]", "n[2a + (n-1)d]", "2n[a + (n-1)d]"], answer: 0 },
                            { question: "If a₁ = 3, a₂ = 7, a₃ = 11, then a₁₀ is:", options: ["37", "39", "35", "41"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            physics: [
                { 
                    name: 'Light', 
                    sets: [
                        [
                            { question: "Light travels in:", options: ["curved lines", "straight lines", "zigzag lines", "circular paths"], answer: 1 },
                            { question: "The speed of light in vacuum is:", options: ["3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁸ m/s", "3 × 10⁹ m/s"], answer: 2 },
                            { question: "A concave mirror forms real image when object is:", options: ["at focus", "between pole and focus", "beyond center of curvature", "at infinity"], answer: 2 },
                            { question: "The refractive index of glass is:", options: ["less than 1", "equal to 1", "greater than 1", "negative"], answer: 2 },
                            { question: "Total internal reflection occurs when light travels from:", options: ["denser to rarer medium", "rarer to denser medium", "same medium", "vacuum to air"], answer: 0 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Human Eye', 
                    sets: [
                        [
                            { question: "The crystalline lens in the eye is:", options: ["concave", "convex", "plane", "cylindrical"], answer: 1 },
                            { question: "Myopia can be corrected using:", options: ["convex lens", "concave lens", "plane mirror", "prism"], answer: 1 },
                            { question: "The retina of the eye is equivalent to:", options: ["lens", "screen", "mirror", "prism"], answer: 1 },
                            { question: "Hypermetropia is corrected by:", options: ["concave lens", "convex lens", "cylindrical lens", "plane glass"], answer: 1 },
                            { question: "The blind spot in the eye is where:", options: ["optic nerve leaves", "lens is located", "pupil is formed", "iris is present"], answer: 0 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Electricity', 
                    sets: [
                        [
                            { question: "The SI unit of electric current is:", options: ["volt", "ampere", "ohm", "watt"], answer: 1 },
                            { question: "Ohm's law states V = IR, where R is:", options: ["current", "voltage", "resistance", "power"], answer: 2 },
                            { question: "Electric power is given by:", options: ["VI", "V/I", "I/V", "V + I"], answer: 0 },
                            { question: "In series combination, current is:", options: ["different", "same", "zero", "maximum"], answer: 1 },
                            { question: "Electrical energy is measured in:", options: ["joule", "watt", "volt", "ampere"], answer: 0 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            chemistry: [
                { 
                    name: 'Acids, Bases and Salts', 
                    sets: [
                        [
                            { question: "Acids turn blue litmus paper:", options: ["blue", "red", "green", "yellow"], answer: 1 },
                            { question: "The pH of pure water is:", options: ["6", "7", "8", "14"], answer: 1 },
                            { question: "Sodium hydroxide is a:", options: ["strong acid", "weak acid", "strong base", "weak base"], answer: 2 },
                            { question: "Common salt is:", options: ["NaCl", "KCl", "CaCl₂", "MgCl₂"], answer: 0 },
                            { question: "Antacids are:", options: ["acidic", "basic", "neutral", "amphoteric"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Metals and Non-metals', 
                    sets: [
                        [
                            { question: "Metals are generally:", options: ["poor conductors", "good conductors", "insulators", "semiconductors"], answer: 1 },
                            { question: "The most abundant metal in Earth's crust is:", options: ["iron", "copper", "aluminum", "zinc"], answer: 2 },
                            { question: "Metals react with oxygen to form:", options: ["hydroxides", "oxides", "carbonates", "sulphates"], answer: 1 },
                            { question: "Non-metals generally form:", options: ["cations", "anions", "neutral atoms", "isotopes"], answer: 1 },
                            { question: "Gold is refined by:", options: ["electrolysis", "roasting", "calcination", "cyanide process"], answer: 3 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Carbon and its Compounds', 
                    sets: [
                        [
                            { question: "Carbon shows the property of:", options: ["catenation", "ionization", "sublimation", "oxidation"], answer: 0 },
                            { question: "The simplest hydrocarbon is:", options: ["ethane", "methane", "propane", "butane"], answer: 1 },
                            { question: "Ethanol is used as:", options: ["fuel", "solvent", "antiseptic", "all of these"], answer: 3 },
                            { question: "Soaps are sodium salts of:", options: ["short chain fatty acids", "long chain fatty acids", "alcohols", "esters"], answer: 1 },
                            { question: "Diamond and graphite are:", options: ["isotopes", "allotropes", "compounds", "mixtures"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            biology: [
                { 
                    name: 'Life Processes', 
                    sets: [
                        [
                            { question: "Photosynthesis occurs in:", options: ["roots", "stems", "leaves", "flowers"], answer: 2 },
                            { question: "The respiratory pigment in humans is:", options: ["chlorophyll", "hemoglobin", "cytochrome", "carotene"], answer: 1 },
                            { question: "Bile is produced by:", options: ["stomach", "pancreas", "liver", "kidney"], answer: 2 },
                            { question: "The functional unit of kidney is:", options: ["neuron", "nephron", "alveoli", "villus"], answer: 1 },
                            { question: "Transportation in plants occurs through:", options: ["phloem only", "xylem only", "both xylem and phloem", "epidermis"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Control and Coordination', 
                    sets: [
                        [
                            { question: "The control and coordination in plants is due to:", options: ["hormones", "nervous system", "both", "none"], answer: 0 },
                            { question: "The basic unit of nervous system is:", options: ["brain", "spinal cord", "neuron", "nerve"], answer: 2 },
                            { question: "Insulin is produced by:", options: ["liver", "pancreas", "kidney", "thyroid"], answer: 1 },
                            { question: "Growth hormone is secreted by:", options: ["thyroid", "adrenal", "pituitary", "pancreas"], answer: 2 },
                            { question: "Reflex action is controlled by:", options: ["brain", "spinal cord", "nerves", "hormones"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Heredity and Evolution', 
                    sets: [
                        [
                            { question: "The father of genetics is:", options: ["Darwin", "Mendel", "Lamarck", "Morgan"], answer: 1 },
                            { question: "Genes are located on:", options: ["ribosomes", "chromosomes", "mitochondria", "nucleus"], answer: 1 },
                            { question: "The theory of evolution was proposed by:", options: ["Mendel", "Darwin", "Lamarck", "Morgan"], answer: 1 },
                            { question: "Homologous organs indicate:", options: ["common ancestry", "different ancestry", "convergent evolution", "no relation"], answer: 0 },
                            { question: "Variation in species promotes:", options: ["extinction", "survival", "both", "none"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                }
            ]
        }
    },
    '11': {
        streams: {
            pcm: ['physics', 'chemistry', 'math'],
            pcb: ['physics', 'chemistry', 'biology'],
            pcmb: ['physics', 'chemistry', 'math', 'biology']
        },
        chapters: {
            physics: [
                { 
                    name: 'Units and Measurements', 
                    sets: [
                        [
                            { question: "The SI unit of luminous intensity is:", options: ["lumen", "candela", "lux", "watt"], answer: 1 },
                            { question: "Dimensional formula for velocity is:", options: ["[LT⁻¹]", "[LT⁻²]", "[ML⁻¹T⁻¹]", "[MLT⁻²]"], answer: 0 },
                            { question: "Significant figures in 0.00340 are:", options: ["2", "3", "4", "5"], answer: 1 },
                            { question: "Which is a vector quantity?", options: ["mass", "time", "displacement", "speed"], answer: 2 },
                            { question: "1 parsec equals:", options: ["3.08 × 10¹³ km", "3.08 × 10¹⁶ m", "9.46 × 10¹⁵ m", "1.5 × 10¹¹ m"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Motion in a Straight Line', 
                    sets: [
                        [
                            { question: "For uniformly accelerated motion, v² = u² + 2as. Here 'a' represents:", options: ["initial velocity", "final velocity", "acceleration", "displacement"], answer: 2 },
                            { question: "The area under velocity-time graph gives:", options: ["acceleration", "displacement", "velocity", "speed"], answer: 1 },
                            { question: "If initial velocity is zero and acceleration is constant, then s ∝:", options: ["t", "t²", "t³", "1/t"], answer: 1 },
                            { question: "The slope of position-time graph gives:", options: ["acceleration", "velocity", "displacement", "distance"], answer: 1 },
                            { question: "For free fall, the value of acceleration is:", options: ["0", "g", "-g", "2g"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                },
                { 
                    name: 'Motion in a Plane', 
                    sets: [
                        [
                            { question: "In projectile motion, the horizontal component of velocity:", options: ["increases", "decreases", "remains constant", "becomes zero"], answer: 2 },
                            { question: "Maximum range of projectile is achieved at angle:", options: ["30°", "45°", "60°", "90°"], answer: 1 },
                            { question: "Time of flight for projectile motion is:", options: ["2u sin θ / g", "u sin θ / g", "2u cos θ / g", "u cos θ / g"], answer: 0 },
                            { question: "In circular motion, centripetal acceleration is:", options: ["v²/r", "vr", "v/r", "r/v"], answer: 0 },
                            { question: "Angular displacement is measured in:", options: ["degrees", "radians", "both a and b", "meters"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            chemistry: [
                { 
                    name: 'Some Basic Concepts of Chemistry', 
                    sets: [
                        [
                            { question: "1 mole contains:", options: ["6.022 × 10²³ particles", "6.022 × 10²⁴ particles", "6.022 × 10²² particles", "6.022 × 10²¹ particles"], answer: 0 },
                            { question: "The molecular mass of H₂SO₄ is:", options: ["96", "98", "100", "104"], answer: 1 },
                            { question: "Empirical formula represents:", options: ["actual formula", "simplest ratio", "molecular structure", "none"], answer: 1 },
                            { question: "Molarity is defined as:", options: ["moles per kg solvent", "moles per L solution", "moles per 100g solution", "grams per L"], answer: 1 },
                            { question: "Limiting reagent determines:", options: ["rate of reaction", "amount of product", "catalyst needed", "temperature"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            math: [
                { 
                    name: 'Sets', 
                    sets: [
                        [
                            { question: "If A = {1, 2, 3} and B = {2, 3, 4}, then A ∪ B is:", options: ["{1, 2, 3, 4}", "{2, 3}", "{1, 4}", "{}"], answer: 0 },
                            { question: "The number of elements in power set of {a, b, c} is:", options: ["6", "7", "8", "9"], answer: 2 },
                            { question: "If A ⊆ B, then A ∩ B equals:", options: ["A", "B", "A ∪ B", "φ"], answer: 0 },
                            { question: "The complement of universal set is:", options: ["universal set", "empty set", "any set", "none"], answer: 1 },
                            { question: "For any set A, A ∪ A' equals:", options: ["A", "A'", "U", "φ"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            biology: [
                { 
                    name: 'The Living World', 
                    sets: [
                        [
                            { question: "Taxonomy is the science of:", options: ["naming", "classification", "identification", "all of these"], answer: 3 },
                            { question: "The basic unit of classification is:", options: ["genus", "species", "family", "kingdom"], answer: 1 },
                            { question: "Binomial nomenclature consists of:", options: ["genus only", "species only", "genus + species", "family + genus"], answer: 2 },
                            { question: "Who proposed five kingdom classification?", options: ["Linnaeus", "Whittaker", "Darwin", "Mendel"], answer: 1 },
                            { question: "Herbarium is a collection of:", options: ["living plants", "dried plants", "seeds", "fruits"], answer: 1 }
                        ],
                        [], [], [], []
                    ]
                }
            ]
        }
    },
    '12': {
        streams: {
            pcm: ['physics', 'chemistry', 'math'],
            pcb: ['physics', 'chemistry', 'biology'],
            pcmb: ['physics', 'chemistry', 'math', 'biology']
        },
        chapters: {
            physics: [
                { 
                    name: 'Electric Charges and Fields', 
                    sets: [
                        [
                            { question: "The SI unit of electric charge is:", options: ["ampere", "coulomb", "volt", "ohm"], answer: 1 },
                            { question: "Coulomb's law is similar to:", options: ["Newton's law of gravitation", "Ohm's law", "Hooke's law", "Faraday's law"], answer: 0 },
                            { question: "Electric field intensity has units:", options: ["N/C", "C/N", "N⋅C", "C⋅N"], answer: 0 },
                            { question: "Electric field lines never:", options: ["start from positive charge", "end at negative charge", "intersect each other", "exist in vacuum"], answer: 2 },
                            { question: "Gauss's law is useful for calculating electric field when there is:", options: ["symmetry", "no symmetry", "one charge", "magnetic field"], answer: 0 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            chemistry: [
                { 
                    name: 'The Solid State', 
                    sets: [
                        [
                            { question: "In ionic solids, the constituent particles are:", options: ["atoms", "molecules", "ions", "electrons"], answer: 2 },
                            { question: "Crystalline solids have:", options: ["sharp melting point", "broad melting range", "no melting point", "infinite melting point"], answer: 0 },
                            { question: "The coordination number in CsCl structure is:", options: ["4", "6", "8", "12"], answer: 2 },
                            { question: "Amorphous solids are also called:", options: ["true solids", "pseudo solids", "super solids", "meta solids"], answer: 1 },
                            { question: "Unit cell is:", options: ["smallest portion", "largest portion", "middle portion", "any portion"], answer: 0 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            math: [
                { 
                    name: 'Relations and Functions', 
                    sets: [
                        [
                            { question: "If f(x) = x², then f(3) is:", options: ["3", "6", "9", "12"], answer: 2 },
                            { question: "Domain of f(x) = 1/x is:", options: ["R", "R - {0}", "R⁺", "R⁻"], answer: 1 },
                            { question: "A function f: A → B is onto if:", options: ["each element of A has unique image", "each element of B has preimage", "f is one-one", "A = B"], answer: 1 },
                            { question: "Identity function is:", options: ["f(x) = 1", "f(x) = x", "f(x) = 0", "f(x) = -x"], answer: 1 },
                            { question: "Range of f(x) = x² is:", options: ["R", "R⁺", "R⁺ ∪ {0}", "R⁻"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                }
            ],
            biology: [
                { 
                    name: 'Reproduction in Organisms', 
                    sets: [
                        [
                            { question: "Asexual reproduction involves:", options: ["two parents", "one parent", "three parents", "no parents"], answer: 1 },
                            { question: "Binary fission is seen in:", options: ["amoeba", "hydra", "yeast", "planaria"], answer: 0 },
                            { question: "Budding occurs in:", options: ["amoeba", "paramecium", "yeast", "bacteria"], answer: 2 },
                            { question: "Gametes are:", options: ["diploid", "haploid", "triploid", "tetraploid"], answer: 1 },
                            { question: "External fertilization occurs in:", options: ["humans", "birds", "fish", "mammals"], answer: 2 }
                        ],
                        [], [], [], []
                    ]
                }
            ]
        }
    }
};