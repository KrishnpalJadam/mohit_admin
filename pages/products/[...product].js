// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT_SETTINGS } from "@/graphql/ProductSettings.js";
import { PRODUCTS, GET_PRODUCT_BY_ID } from "@/graphql/Products.js";
import { addProduct, editProduct } from "@/redux/slices/products.js";
import { FormTextField, FormSelectField } from "@/helpers/FormFields.js";
import { isRequired } from "@/helpers/FormValidators.js";
import ProductFields from "@/components/Products/ProductFields";
import ReactDraft from "@/components/ReactDraft/ReactDraft";
import Seo from "@/components/Seo/Seo";
import PrimaryButton from "@/components/Button/PrimaryButton";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import useStyles from "@/components/Products/styles.js";
import getServerSideProps from "@/helpers/ServerProps.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

// ** Third party imports
import { Field, Form } from "react-final-form";
import { useMutation, useQuery } from "@apollo/client";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";

export default function CreateProduct() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const [product, setProduct] = useState({
    variantAttributes: [1],
  });
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([]);
  const [productType, setProductType] = useState("");
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [variantCombinations, setVariantCombinations] = useState(null);

  // Product id
  const productId =
    router.asPath.split("/")[3]?.length === 24
      ? router.asPath.split("/")[3]
      : null;

  // Variant attributes max limit
  const FIELDS_MAX_LIMIT = 3;

  // Product types
  const productTypes = [
    {
      label: "Simple product",
      value: "simple",
    },
    {
      label: "Variable product",
      value: "variable",
    },
  ];

  // Product data
  const productsData = useSelector((state) => state.products.products);

  // Queries
  const productSettingsQuery = useQuery(GET_PRODUCT_SETTINGS);

  // Fetching the product from DB
  const [getProductById] = useMutation(GET_PRODUCT_BY_ID, {
    onCompleted(data) {
      if (data?.getProductById) {
        const updatedProduct = setVariantAttributes(data.getProductById);

        setProduct(updatedProduct);
      } else {
        router.push("/404");
      }
    },
  });

  // Set variant attributes
  const setVariantAttributes = (product) => {
    let updatedProduct;

    if (!product.variants?.length > 0) {
      updatedProduct = {
        ...product,
        variantAttributes: [1],
      };
    } else {
      const totalVariantAttributes = Object.keys(
        product.variants[0]?.attributes || {}
      ).length;

      // Dynamically create variants based on the totalVariantAttributes length
      const updatedVariantAttributes = Array.from(
        { length: totalVariantAttributes },
        (_, index) => index + 1
      );

      updatedProduct = {
        ...product,
        variantAttributes: updatedVariantAttributes,
      };
    }

    return updatedProduct;
  };

  // Initializing product
  useEffect(() => {
    if (productId?.length === 24) {
      const product = productsData?.find((product) => {
        return product._id === productId;
      });

      if (product) {
        const updatedProduct = setVariantAttributes(product);

        setProduct(updatedProduct);
      } else {
        getProductById({ variables: { id: productId } });
      }
    }
  }, [productId, productsData]);

  // Initializing product type, variants & options
  useEffect(() => {
    if (product?.productType) {
      setProductType(product.productType);
    }

    if (product?.variants?.length > 0 && product?.productType === "variable") {
      // Setting variants
      const initialSelectedVariants = {};

      // Assume we use the first variant to create the mapping
      const firstVariantAttributes = product.variants[0]?.attributes || {};

      Object.keys(firstVariantAttributes).forEach((attributeName, index) => {
        initialSelectedVariants[index] = attributeName;
      });

      setSelectedVariants(initialSelectedVariants);

      // Setting variant options
      const initialSelectedOptions = {};

      product.variants.forEach((variant) => {
        if (variant.attributes && typeof variant.attributes === "object") {
          Object.entries(variant.attributes).forEach(
            ([attributeName, attributeData], attributeIndex) => {
              if (!initialSelectedOptions[attributeIndex]) {
                initialSelectedOptions[attributeIndex] = [];
              }

              // Check if the value already exists for this attribute, if not, push it
              const valueExists = initialSelectedOptions[attributeIndex].some(
                (option) => option.value === attributeData.value
              );

              // Add the option only if it doesn't already exist for this attribute index
              if (!valueExists) {
                initialSelectedOptions[attributeIndex].push({
                  value: attributeData.value,
                  meta: attributeData.meta || "",
                });
              }
            }
          );
        }
      });

      setSelectedOptions(initialSelectedOptions);
    }
  }, [product]);

  // Initializing categories & variants
  useEffect(() => {
    const categoriesArray =
      productSettingsQuery?.data?.getProductSettings?.categories;

    const variantArray =
      productSettingsQuery?.data?.getProductSettings?.variants;

    if (categoriesArray?.length > 0) {
      const categories = [];

      categoriesArray.map((category) => {
        return categories.push({
          value: category,
        });
      });

      setCategories(categories);
    }

    if (variantArray?.length > 0) {
      setVariants(variantArray);
    }
  }, [productSettingsQuery]);

  // Based on variants & options change, generating variant combinations
  useEffect(() => {
    // Allowing if it's valid array
    if (
      Object.values(selectedOptions).some((options) => Array.isArray(options))
    ) {
      generateCombinations(selectedOptions);
    }
  }, [selectedVariants, selectedOptions]);

  // To handle product type change
  const handleProductTypeChange = (value) => {
    setProductType(value);
  };

  // Generate variant combinations
  const generateCombinations = (selectedOptions) => {
    // Convert selectedOptions into an array of arrays of values
    const optionsArray = Object.values(selectedOptions).map((optionArray) =>
      optionArray.map((option) => option.value)
    );

    // Generate combinations based on the latest options
    const combinations = optionsArray.reduce(
      (acc, curr) => {
        const res = [];
        acc.forEach((prev) => {
          curr.forEach((value) => {
            res.push([...prev, value]);
          });
        });
        return res;
      },
      [[]]
    );

    // Set the new combinations
    setVariantCombinations(combinations);
  };

  // To get updated variants
  const getUpdatedVariants = (values) => {
    if (productType === "variable") {
      const updatedVariants = variantCombinations?.map((combination, index) => {
        const attributes = {};

        combination.forEach((option, i) => {
          const attributeName = selectedVariants[i]; // e.g., "colors", "sizes"

          // Find the attribute in variants by name
          const attributeData = variants.find(
            (attr) => attr.name === attributeName
          );

          // Find the specific option within the attribute's options
          const optionData = attributeData?.options.find(
            (opt) => opt.value === option
          );

          attributes[attributeName] = {
            value: option, // e.g., "black"
            meta: optionData?.meta || "", // e.g., "#000000"
          };
        });

        return {
          attributes,
          _id: values.variants?.[index]?._id,
          // Only include fields that are not empty
          ...(values.variants?.[index]?.images?.length
            ? { images: values.variants[index].images }
            : {}),
          ...(values.variants?.[index]?.regularPrice
            ? { regularPrice: Number(values.variants[index].regularPrice) }
            : {}),
          ...(values.variants?.[index]?.salePrice
            ? { salePrice: Number(values.variants[index].salePrice) }
            : {}),
          ...(values.variants?.[index]?.tax
            ? { tax: Number(values.variants[index].tax) }
            : {}),
          ...(values.variants?.[index]?.stock
            ? { stock: Number(values.variants[index].stock) }
            : {}),
        };
      });

      return updatedVariants;
    }
  };

  // To handle product add or edit
  const submit = async (values) => {
    const productData = {
      id: values._id || null,
      name: values.name.toLowerCase(),
      description: values.description,
      category: values.category.toLowerCase(),
      productType,
      images: values.images,
      regularPrice: +values.regularPrice,
      salePrice: +values.salePrice,
      tax: +values.tax,
      stock: +values.stock,
      variants: productType === "variable" ? getUpdatedVariants(values) : [],
    };

    // Validation
    if (!productData.variants?.length > 0 && productType === "variable") {
      ToastStatus("Error", "Please choose variants");
    } else if (
      productData.images?.length === 0 ||
      productData.images.length > 6
    ) {
      const toastMessage =
        productData.images.length > 1
          ? "Only six images are allowed"
          : "Please add product images";
      ToastStatus("Error", toastMessage);
    } else {
      await products({ variables: productData });
    }
  };

  // Add / edit product
  const [products, { loading }] = useMutation(PRODUCTS, {
    onCompleted(data) {
      if (data?.products?.status === 200) {
        productId
          ? dispatch(editProduct(data.products))
          : dispatch(addProduct(data.products));

        ToastStatus("Success", data.products.message);

        setTimeout(() => {
          router.push("/products/all");
        }, [1500]);
      } else {
        ToastStatus("Error", data.products.message);
      }
    },
  });

  return (
    <Paper className={classes.form}>
      <Seo title={productId ? "Update a product" : "Create a product"} />
      <Toaster />
      <Typography variant="h4">
        {productId ? "Update a product:" : "Create a product:"}
      </Typography>
      <Form
        onSubmit={submit}
        initialValues={product}
        mutators={{
          ...arrayMutators,
        }}
      >
        {({ handleSubmit, invalid }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="name"
                  component={FormTextField}
                  validate={isRequired}
                  label="Product name"
                />
              </div>
            </div>
            <div className={classes.formFields}>
              <Field name="description" validate={isRequired}>
                {(props) => (
                  <div>
                    <ReactDraft
                      {...props.input}
                      placeholder="Write something awesome😌"
                    />
                  </div>
                )}
              </Field>
            </div>
            <div className={classes.formFields}>
              <div className={classes.formField}>
                <Field
                  name="category"
                  component={FormSelectField}
                  options={categories}
                  label={"Categories"}
                  validate={isRequired}
                  initializeValue={product?.category}
                />
              </div>
              <div className={classes.formField}>
                <Field
                  name="productType"
                  component={FormSelectField}
                  options={productTypes}
                  label={"Product type"}
                  validate={isRequired}
                  initializeValue={product?.productType}
                  inputOnChange={handleProductTypeChange}
                />
              </div>
            </div>
            {/* Common fields for both simple & variable type*/}
            <ProductFields type="simple" />
            {/* Fields for variable type */}
            {productType === "variable" && (
              <FieldArray name="variantAttributes">
                {({ fields }) => (
                  <div>
                    {fields.map((name, index) => (
                      <div key={index}>
                        {index === 0 && (
                          <div className={classes.incDecBtn}>
                            <Typography variant="h6">
                              Choose variants:
                            </Typography>
                            <div>
                              {fields.length < FIELDS_MAX_LIMIT && (
                                <GrAddCircle
                                  onClick={() =>
                                    fields.length < FIELDS_MAX_LIMIT &&
                                    fields.push({
                                      name: "",
                                      options: [{ value: "" }],
                                    })
                                  }
                                />
                              )}
                              {fields.length > 1 && (
                                <AiOutlineMinusCircle
                                  onClick={() => {
                                    // Remove the field at the specified index
                                    fields.remove(index);

                                    // Update "selectedVariants" by removing the last entry
                                    setSelectedVariants(
                                      (prevSelectedVariants) => {
                                        const updatedVariants = {
                                          ...prevSelectedVariants,
                                        };
                                        const lastKey =
                                          Object.keys(updatedVariants).pop(); // Get the last key
                                        if (lastKey !== undefined) {
                                          delete updatedVariants[lastKey];
                                        }
                                        return updatedVariants;
                                      }
                                    );

                                    // Update "selectedOptions" by removing the last entry
                                    setSelectedOptions(
                                      (prevSelectedOptions) => {
                                        const updatedOptions = {
                                          ...prevSelectedOptions,
                                        };
                                        const lastKey =
                                          Object.keys(updatedOptions).pop();
                                        if (lastKey !== undefined) {
                                          delete updatedOptions[lastKey];
                                        }
                                        return updatedOptions;
                                      }
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        )}
                        <div className={classes.formFields}>
                          <div className={classes.formField}>
                            <Field
                              name="variantName"
                              component={FormSelectField}
                              options={variants.map((variant) => ({
                                label: variant.name,
                                value: variant.name,
                                disabled: Object.values(
                                  selectedVariants
                                ).includes(variant.name),
                              }))}
                              label="Variants"
                              initializeValue={selectedVariants[index] || ""}
                              inputOnChange={(value) => {
                                setSelectedVariants((prev) => ({
                                  ...prev,
                                  [index]: value,
                                }));
                                setSelectedOptions((prev) => ({
                                  ...prev,
                                  [index]: [],
                                }));
                              }}
                            />
                          </div>
                          <div className={classes.formField}>
                            <Autocomplete
                              multiple
                              options={
                                variants.find(
                                  (v) => v.name === selectedVariants[index]
                                )?.options || []
                              }
                              getOptionLabel={(option) => option.value}
                              isOptionEqualToValue={(option, value) =>
                                option.value === value.value &&
                                option.meta === value.meta
                              }
                              filterSelectedOptions
                              value={selectedOptions[index] || []}
                              onChange={(event, values) => {
                                setSelectedOptions((prevSelectedOptions) => ({
                                  ...prevSelectedOptions,
                                  [index]: values,
                                }));
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Options"
                                  placeholder="Choose options"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            )}
            {/* Based on variants chosen, variant combinations will be rendered here */}
            {productType === "variable" && (
              <>
                {variantCombinations?.length > 0 ? (
                  <>
                    <Typography variant="h6" sx={{ mt: 4 }}>
                      Selected combinations:
                    </Typography>
                    {variantCombinations.map((combination, index) => (
                      <Accordion
                        key={index}
                        className={classes.variant}
                        disableGutters
                      >
                        <AccordionSummary
                          expandIcon={<MdExpandMore fontSize={"1.5em"} />}
                        >
                          <Typography variant="h6" sx={{ opacity: 0.75 }}>
                            {`Variant ${index + 1} : ${combination.join(
                              " / "
                            )}`}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ mt: -3 }}>
                          <ProductFields type="variants" index={index} />
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </>
                ) : (
                  <Typography
                    variant="h5"
                    color="error"
                    align="center"
                    sx={{ mt: 5 }}
                  >
                    Select variant & options
                  </Typography>
                )}
              </>
            )}
            <div className={classes.actionBtn}>
              <PrimaryButton
                type="submit"
                text="Save"
                disabled={invalid}
                spinner={loading}
              />
            </div>
          </form>
        )}
      </Form>
    </Paper>
  );
}

export { getServerSideProps };
