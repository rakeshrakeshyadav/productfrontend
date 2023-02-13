import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Flex,
  Box,
  Heading,
  Button,
  Wrap,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@chakra-ui/react";
import { htmlToText } from "html-to-text";

const Products = () => {
  const toast = useToast();
  const [details, setDetails] = useState(null);
  const [query, setQuery] = useState("");
  const [queryType, setqueryType] = useState("");
  const [ProdID, setProdID] = useState("");
  const [ID, setID] = useState("");
  const [AddDetails, setAddDetails] = useState({});
  const [code, setCode] = useState("");
  const [faq, setFaq] = useState([]);
  const [Newfaq, setNewFaq] = useState({ question: "", answer: "" });
  const [obj, setObj] = useState([]);
  const [productname, setProductname] = useState("");
  const [logo,setLogo] = useState("");
  // ###########################
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const handleProcedureContentChange = (content) => {
    setCode(content);
    // console.log(target)
    setAddDetails({
      ...AddDetails,
      description: content,
    });
  };

  const handleQuery = (e) => {
    let q = e.target.value;
    setQuery(q);
    
  };
  
  const checkqueryType=()=>{
    if (query.includes("material")) {
      setqueryType("material"); 
    } else {
      setqueryType("product");
    }
  }
  console.log(queryType)
  const checkproductType=()=>{
    if(queryType=="product"){
      let pname = query.split("product/");
        setProductname(pname[1]);
    }
    if(queryType=="material"){
      let pname = query.split("material/");
        setProductname(pname[1]);
    }
  }
  console.log(productname)
  useEffect(()=>{
    checkqueryType()
    
  },[query])

  useEffect(()=>{
    checkproductType()
  })
console.log()
  const handleSearch = async () => {
    
    try {
      console.log(
        `https://thepipingmart.up.railway.app/${queryType}/${productname}`
      );
      let data1 = await axios(
        `https://thepipingmart.up.railway.app/${queryType}/${productname}`
      );

      setDetails(data1.data);

      setProdID(data1.data.productId);
      let defaultdata = htmlToText(data1?.data.description, {});
      setFaq(data1.data.faqs);

      setCode(defaultdata);
      setID(data1.data._id);
      setObj(data1.data.faqs);
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Not Found",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  // console.log(`${queryType}/${productname}`)
  const handleAdd = async () => {
    console.log(AddDetails);
    try {
      if ((AddDetails = {})) {
        return toast({
          title: "Error",
          description: "Enter Valid Data",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
      let res = await axios.post(
        "https://thepipingmart.up.railway.app/product",
        AddDetails
      );
      toast({
        title: "Sucess",
        description: "Product Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed",
        description: "Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleUpdate = async () => {
    console.log(AddDetails);
    try {
      let res = await axios.patch(
        `https://thepipingmart.up.railway.app/${queryType}/${ID}`,
        AddDetails
      );
      // console.log(res);
      toast({
        title: "Success",
        description: "Updated Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // alert("Updated successfully");
    } catch (err) {
      console.log(err.message);
      toast({
        title: "Error",
        description: "Updation Failed",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      // alert("Updation Failed");
    }
  };
  // #####################faq onchange function########################

  const faqOnchange = ({ name, value }, index) => {
    let x = obj.map((ele, i) => {
      if (index == i) {
        if (name == "question") {
          ele.question = value;
        } else {
          ele.answer = value;
        }
      }
      return ele;
    });
    setObj(x);
  };

  //-----------------------------------------------------
  const handleSavefaq = () => {
    let x = obj;
    x.push(Newfaq);
    setObj(x);
    // console.log(obj)
    setAddDetails({ ...AddDetails, faqs: obj });
    setOpen(false);
  };

  // ----------------------------------------------------
  const handleAddnewFaq = ({ target }) => {
    setNewFaq({ ...Newfaq, [target.name]: target.value });
  };

  const handleEditFaq = () => {
    console.log(obj);
    setAddDetails({ ...AddDetails, faqs: obj });
  };

  const handleRemoveFaq = (index) => {
    let x = obj.filter((ele, i) => {
      return i != index;
    });

    setFaq(x);
    // console.log(x)
    setAddDetails({ ...AddDetails, faqs: x });
  };
  const handleChange = ({ name, value }) => {
    setAddDetails({
      ...AddDetails,
      [name]: value,
    });
  };
  const handleAddFaq = () => {
    setOpen(true);
  };

  const handleChange1 = ({name,value})=>{
    console.log(name,value)
  }
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Container
        bg="#9DC4FB"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
          <Box
            color="black"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Heading>Products</Heading>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <Box>
                  <Box
                    rounded={"lg"}
                    boxShadow={"lg"}
                    p={8}
                    display="flex"
                    justifyContent="center"
                  >
                    <Flex
                      spacing={4}
                      p={8}
                      textAlign="center"
                      flexDirection="column"
                      boxShadow="lg"
                      bg="white"
                      borderRadius="lg"
                    >
                      <Box
                        margin="auto"
                        display="flex"
                        alignItems="flex-end"
                        gap="10px"
                      >
                        <FormControl id="ProductName" w="500px">
                          <FormLabel textAlign="center">Product URL</FormLabel>
                          <Input
                            type="text"
                            boxShadow="lg"
                            value={query}
                            onChange={(e) => handleQuery(e)}
                          />
                        </FormControl>
                        <Button onClick={handleSearch}>Search</Button>
                      </Box>
                      <Flex gap={5} flexWrap="wrap" p={8}>
                        <Box>
                          <FormControl id="ProductName" w="300px">
                            <FormLabel>Product Name</FormLabel>
                            <Input
                              name="displayName"
                              type="text"
                              defaultValue={
                                details && details.displayName !== ""
                                  ? details.displayName
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="url" w="300px">
                            <FormLabel>URL</FormLabel>
                            <Input
                              name="url"
                              type="text"
                              defaultValue={
                                details && details.url !== "" ? details.url : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>

                        <Box>
                          <FormControl id="h1" w="300px">
                            <FormLabel>Upload logo </FormLabel>
                            <Input
                              name="logo"
                              type="file"
                              defaultValue={
                                details && details.logo !== ""
                                  ? details.logo
                                  : ""
                              }
                              onChange={({ target }) => handleChange1(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="keywords" w={900}>
                            <FormLabel>Keywords</FormLabel>
                            <Textarea
                              name="keywords"
                              defaultValue={
                                details && details.keywords !== ""
                                  ? details.keywords
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="title" w={480}>
                            <FormLabel>Title</FormLabel>
                            <Textarea
                              name="title"
                              defaultValue={
                                details && details.title !== ""
                                  ? details.title
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="Meta" w={480}>
                            <FormLabel>Meta</FormLabel>
                            <Textarea
                              name="meta"
                              defaultValue={
                                details && details.meta !== ""
                                  ? details.meta
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="description">
                            <FormLabel>Description</FormLabel>
                            <Box w="1000px" h="auto" overflow="hidden">
                              <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={code}
                                onChange={handleProcedureContentChange}
                              />
                            </Box>
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="faq" width="800px">
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                margin: "20px",
                              }}
                            >
                              <FormLabel>FAQ's</FormLabel>
                            </Box>

                            {faq &&
                              faq.length &&
                              faq.map((item, key) => (
                                <Box key={key}>
                                  <Box
                                    mb="50px"
                                    display="flex"
                                    flexDirection="column"
                                  >
                                    <Input
                                      name="question"
                                      type="text"
                                      // key={key}
                                      defaultValue={item?.question}
                                      onChange={({ target }) =>
                                        faqOnchange(target, key)
                                      }
                                    />
                                    <Textarea
                                      // key={key}
                                      name="answer"
                                      onChange={({ target }) =>
                                        faqOnchange(target, key)
                                      }
                                    >
                                      {htmlToText(item?.answer)}
                                    </Textarea>
                                    {/* <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={code}
                                onChange={({ target }) =>faqOnchange(target, key)}
                              /> */}
                                    <Box mt="20px">
                                      <Button
                                        width="20%"
                                        size="sm"
                                        bg={"blue.400"}
                                        color={"white"}
                                        _hover={{
                                          bg: "blue.500",
                                        }}
                                        onClick={() => handleEditFaq(key)}
                                      >
                                        Edit FAQ
                                      </Button>
                                      <Button
                                        ml="20px"
                                        width="20%"
                                        size="sm"
                                        bg={"red.400"}
                                        color={"white"}
                                        _hover={{
                                          bg: "red.500",
                                        }}
                                        onClick={() => handleRemoveFaq(key)}
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </Box>
                                </Box>
                              ))}

                            {open && (
                              <>
                                <Input
                                  type="text"
                                  name="question"
                                  defaultValue=""
                                  onChange={handleAddnewFaq}
                                />
                                <Box>
                                  <Textarea
                                    name="answer"
                                    onChange={handleAddnewFaq}
                                  >
                                    {htmlToText(Newfaq?.answer)}
                                  </Textarea>
                                  {/* <ReactQuill
                                  theme="snow"
                                  modules={modules}
                                  formats={formats}
                                  value={newFaq.answer}
                                  onChange={handleChangeAnswer}
                                /> */}
                                  {/* <Textarea>
                                  {htmlToText("test")}
                                </Textarea> */}
                                </Box>
                                <Box
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    margin: "20px",
                                  }}
                                >
                                  <Button
                                    width="20%"
                                    size="sm"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                      bg: "blue.500",
                                    }}
                                    onClick={handleSavefaq}
                                  >
                                    Save
                                  </Button>
                                </Box>
                              </>
                            )}
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                margin: "20px",
                              }}
                            >
                              <Button
                                width="20%"
                                size="sm"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                  bg: "blue.500",
                                }}
                                onClick={handleAddFaq}
                              >
                                Add FAQ
                              </Button>
                            </Box>
                          </FormControl>
                        </Box>
                      </Flex>
                      <Flex></Flex>

                      <Flex gap={5} justifyContent="center" pt="1rem">
                        <Button
                          width="20%"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          onClick={handleAdd}
                        >
                          Add Product
                        </Button>
                        <Button
                          width="20%"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          onClick={handleUpdate}
                        >
                          Update
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default Products;
